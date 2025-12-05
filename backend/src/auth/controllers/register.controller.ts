import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../user/models/user.model';

export default async function registerController(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body as Record<string, unknown> | undefined;
    const username = body?.['username'];
    const email = body?.['email'];
    const password = body?.['password'];

    const minPasswordLen = Number(process.env.MIN_PASSWORD_LENGTH ?? 6);
    if (typeof username !== 'string' || username.trim() === '' || typeof email !== 'string' || email.trim() === '' || typeof password !== 'string' || password.length < minPasswordLen) {
      return res.status(400).json({ ok: false, message: `Invalid input: username, email required and password must be at least ${minPasswordLen} characters` });
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] }).exec();
    if (existing) return res.status(409).json({ ok: false, message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();

    req.logIn(user as Express.User, (err?: Error | null) => {
      if (err) return next(err);
      return res.json({ ok: true, user: { id: String(user._id), email: user.email } });
    });
  } catch (err) {
    return next(err as Error);
  }
}

import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import passport from '../../auth/passport';

const router = Router();

type MinimalUser = { _id: unknown; email?: string };

const isMinimalUser = (u: unknown): u is MinimalUser => {
  return typeof u === 'object' && u !== null && '_id' in u;
};

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: Error | null, user: unknown, info: Record<string, unknown> | undefined) => {
    if (err) return next(err);

    if (!user) return res.status(401).json({ ok: false, message: info?.['message'] || 'Unauthorized' });

    if (!isMinimalUser(user)) return next(new Error('Invalid user object'));

    req.logIn(user as Express.User, (err?: Error | null) => {
      if (err) return next(err);
      return res.json({ ok: true, user: { id: String(user._id), email: user.email } });
    });
  })(req, res, next);
});

export default router;

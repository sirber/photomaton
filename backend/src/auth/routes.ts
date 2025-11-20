import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import passport from './passport';

const router = Router();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const ALLOWED_PROVIDERS = ['google', 'microsoft'] as const;

const isProvider = (p: string): p is (typeof ALLOWED_PROVIDERS)[number] =>
  (ALLOWED_PROVIDERS as readonly string[]).includes(p);

router.get('/:provider', (req: Request, res: Response, next: NextFunction) => {
  const provider = String(req.params.provider || '');
  if (!isProvider(provider)) return res.status(404).send('Unknown provider');

  const opts = provider === 'google'
    ? { scope: ['profile', 'email'], state: JSON.stringify({ ts: Date.now() }) }
    : { scope: ['openid', 'profile', 'email'], state: JSON.stringify({ ts: Date.now() }) };

  // start OAuth flow
  passport.authenticate(provider, opts)(req, res, next);
});

router.get('/:provider/callback', (req: Request, res: Response, next: NextFunction) => {
  const provider = String(req.params.provider || '');
  if (!isProvider(provider)) return res.status(404).send('Unknown provider');

  passport.authenticate(provider, { failureRedirect: `${FRONTEND_URL}/login`, session: true }, (err: Error | null, user: Express.User | false | null) => {
    if (err) return next(err);
    if (!user) return res.redirect(`${FRONTEND_URL}/login`);

    req.logIn(user, (err?: Error | null) => {
      if (err) return next(err);
      // Session cookie is set by express-session; redirect back to frontend
      return res.redirect(FRONTEND_URL);
    });
  })(req, res, next);
});

router.get('/me', (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ ok: false });

  const maybeUser = req.user;
  if (!maybeUser || typeof maybeUser !== 'object') return res.status(500).json({ ok: false });

  // Safely extract common fields without using `any`
  const u: { id?: string; email?: string } = {};
  const uObj = maybeUser as Record<string, unknown>;
  if ('_id' in uObj) u.id = String(uObj['_id']);
  else if ('id' in uObj) u.id = String(uObj['id']);
  if ('email' in uObj && typeof uObj['email'] === 'string') u.email = uObj['email'] as string;

  return res.json({ ok: true, user: u });
});

export default router;

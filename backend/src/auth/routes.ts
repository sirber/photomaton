import { Router } from 'express';
import type {} from 'express';
import startOAuth from './controllers/startOAuth.controller';
import callbackOAuth from './controllers/callback.controller';
import meController from './controllers/me.controller';
import loginController from './controllers/login.controller';

const router = Router();

router.get('/:provider', startOAuth);
router.get('/:provider/callback', callbackOAuth);
router.get('/me', meController);
router.post('/login', loginController);

export default router;

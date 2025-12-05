import { Router } from 'express';
import startOAuth from './controllers/startOAuth.controller';
import callbackOAuth from './controllers/callback.controller';
import meController from './controllers/me.controller';
import loginController from './controllers/login.controller';
import registerController from './controllers/register.controller';

const router = Router();

router.get('/me', meController);
router.post('/login', loginController);
router.post('/register', registerController);
router.get('/:provider', startOAuth);
router.get('/:provider/callback', callbackOAuth);

export default router;

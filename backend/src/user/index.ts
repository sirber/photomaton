import { Router } from 'express';
import loginController from './controllers/login.controller';
import registerController from './controllers/register.controller';

const router = Router();

router.use(loginController);
router.use(registerController);

export default router;

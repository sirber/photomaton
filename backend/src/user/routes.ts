import { Router } from 'express';
import registerController from './controllers/register.controller';

const router = Router();

router.use(registerController);

export default router;

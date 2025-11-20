import { Router } from 'express';
const router = Router();

router.get('/register', (req, res) => {
  res.send('User register page');
});

router.post('/register', (req, res) => {
  res.send('User registered');
});

export default router;

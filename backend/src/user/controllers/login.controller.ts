import { Router } from 'express';
const router = Router();

router.get('/login', (req, res) => {
  res.send('User login');
});

router.post('/login', (req, res) => {
  res.send('User logged in');
});

export default router;

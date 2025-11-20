import express from 'express';
import path from 'path';

const app = express();

// Database
import { connectToDatabase } from './common/database';
await connectToDatabase();

// Serve frontend (production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'static')));
}

// API endpoints
import userRouter from './user';
app.use('/user', userRouter);

// Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

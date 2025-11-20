import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from './auth/passport';
const app = express();

// Database
import { connectToDatabase } from './common/database';
await connectToDatabase();

// Serve frontend (production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'static')));
}

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions + Passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(passport.initialize());
app.use(passport.session());

// API endpoints
import userRouter from './user/routes';
app.use('/user', userRouter);

import authRouter from './auth/routes';
app.use('/auth', authRouter);

// Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

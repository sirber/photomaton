import express from 'express';
import { IUser } from '../user/models/user.model';

declare global {
  namespace Express {
    interface User extends Partial<IUser> {}
    interface Request {
      logIn(user: Express.User, cb: (err?: Error) => void): void;
    }
  }
}

export {};

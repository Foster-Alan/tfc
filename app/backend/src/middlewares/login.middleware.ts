import { Request, Response, NextFunction } from 'express';
import statusCode from '../utils/statusCode.util';

const message = 'All fields must be filled';
const validate = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const loginValidate = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(statusCode.badRequest).json({ message });
  }
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!validate(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default loginValidate;

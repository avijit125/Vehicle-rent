import prisma from '../../utils/dbClient';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
};

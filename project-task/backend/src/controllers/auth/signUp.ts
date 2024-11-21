import prisma from '../../utils/dbClient';
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response): Promise<any> =>{
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { firstName, lastName, email, password: hashedPassword },
  });

  res.status(201).json({ message: 'User registered successfully', user });
};
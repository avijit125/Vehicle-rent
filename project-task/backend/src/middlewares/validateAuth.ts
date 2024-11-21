import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
export const validateJWTAuth = (req: Request, res: Response, next: any): any => {
    // Get the JWT token from the request header or  cookie
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    if (!token) { 
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // decode jwt and check user
    try {
        const decoded:any = jwt.verify(token, process.env.JWT_SECRET!);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

}
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

// Explicitly typing the middleware as a RequestHandler
export const validateRequest = (schema: ZodSchema): ((req: Request, res: Response, next: NextFunction) => void) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next(); // Continue to the next middleware or route handler
    } catch (err: any) {
      res.status(400).json({
        error: 'Validation error',
        details: err.errors, // Zod provides detailed validation error messages
      });
    }
  };
};


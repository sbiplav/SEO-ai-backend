import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const chatSchema = z.object({
  message: z.string()
    .min(1, "Message is required")
    .max(500, "Message too long (max 500 characters)")
    .refine(val => !/(password|ssn|credit card)/gi.test(val), {
      message: "Potential sensitive content detected"
    })
});

export function sanitizeInput(input: string): string {
  return input
    .replace(/(name:\s*)\w+/gi, '$1[REDACTED]')
    .replace(/(email:\s*)[^\s]+/gi, '$1[REDACTED]')
    .replace(/(age:\s*)\d+/gi, '$1[REDACTED]');
}

export const sanitizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validated = chatSchema.parse(req.body);
    req.body.message = sanitizeInput(validated.message);
    next();
  } catch (err: any) {
    res.status(400).json({ error: err.errors[0]?.message || 'Invalid input' });
  }
};
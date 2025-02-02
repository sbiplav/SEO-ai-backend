import { RateLimiterMemory } from 'rate-limiter-flexible';
import config from '../config';

const rateLimiter = new RateLimiterMemory({
  points: config.rateLimit.max,
  duration: config.rateLimit.windowMs / 1000,
});

export const rateLimiterMiddleware = (req: any, res: any, next: any) => {
  rateLimiter.consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).json({
      error: 'Too many requests. Please try again later.'
    }));
};
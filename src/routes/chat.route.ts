import { Router } from 'express';
import { chatController } from '../controllers/chat.controller';
import { sanitizeMiddleware } from '../middlewares/sanitize.middleware';
import { rateLimiterMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post(
  '/',
  rateLimiterMiddleware,
  sanitizeMiddleware,
  chatController.generateContent
);

router.get('/healthcheck', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

export default router;
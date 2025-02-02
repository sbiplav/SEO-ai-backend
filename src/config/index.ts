import dotenv from 'dotenv';

dotenv.config();

export default {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  server: {
    port: parseInt(process.env.PORT || '5000'),
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '3600000'),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100')
  }
};
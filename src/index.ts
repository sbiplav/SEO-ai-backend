import express from 'express';
import http from 'http';
import cors from 'cors';
import chatRoutes from './routes/chat.route'
import { rateLimiterMiddleware } from './middlewares/auth.middleware';

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
app.use(rateLimiterMiddleware);

app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
}).on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is in use, trying another port...`);
    server.listen(0, () => {
      console.log(`🚀 Server running on port ${JSON.stringify(server.address())}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
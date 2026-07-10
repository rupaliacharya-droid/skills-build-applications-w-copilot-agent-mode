import { startServer } from './server';

startServer().catch((error) => {
  console.error('Failed to connect to MongoDB', error);
  process.exit(1);
});

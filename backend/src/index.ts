import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { createExpressApp } from './infrastructure/server/app';

// Load environmental configurations
dotenv.config();

const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

async function bootstrap() {
  try {
    // Attempt database connection
    await prisma.$connect();
    console.log('[Database] Connected successfully to SQLite.');

    const app = createExpressApp(prisma);

    app.listen(port, () => {
      console.log(`[Server] URL Shortener backend running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('[Server] Fatal bootstrapping error:', error);
    process.exit(1);
  }
}

bootstrap();

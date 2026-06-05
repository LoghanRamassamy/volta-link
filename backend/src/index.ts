import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { createExpressApp } from './infrastructure/server/app';

import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

// Load environmental configurations
dotenv.config();

const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });
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

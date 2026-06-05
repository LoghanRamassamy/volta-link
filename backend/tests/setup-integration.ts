import { execSync } from "node:child_process";
import { beforeAll, beforeEach } from "vitest";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Use test database file for integration tests (memory DB fails on Windows schema push)
const TEST_DB_URL = "file:./test.db";
process.env.DATABASE_URL = TEST_DB_URL;

// Create SQLite connection
const adapter = new PrismaBetterSqlite3({ url: TEST_DB_URL });

export const prisma = new PrismaClient({ adapter });

beforeAll(() => {
  // Push the schema to the in-memory database
  execSync("npx prisma db push", {
    env: { ...process.env, DATABASE_URL: TEST_DB_URL },
    stdio: "inherit",
  });
});

beforeEach(async () => {
  // Clean up all tables before each test
  await prisma.shortLink.deleteMany();
});

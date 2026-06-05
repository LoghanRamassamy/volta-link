import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  datasource: {
    url: env("DATABASE_URL") || "file:./dev.db",
  },
  schema: "prisma/schema.prisma",
});

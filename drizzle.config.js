import { defineConfig } from "drizzle-kit";
import data from "./src/models/index.js"

export default defineConfig({
  out: "./drizzle/migration",
  schema: "./src/models/index.js",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});

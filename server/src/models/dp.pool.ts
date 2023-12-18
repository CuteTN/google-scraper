import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { EnvProvider } from "../common/env-provider/env-provider";

const pool = new Pool({
  connectionString: EnvProvider.getVar("DB_CONNECTION_STRING"),
});

export const db = drizzle(pool);

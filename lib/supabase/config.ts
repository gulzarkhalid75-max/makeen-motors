/** PostgREST schema for application tables (profiles, vehicles, …). */
export const SUPABASE_DB_SCHEMA = "public" as const;

export const supabaseDbOptions = {
  db: { schema: SUPABASE_DB_SCHEMA },
} as const;

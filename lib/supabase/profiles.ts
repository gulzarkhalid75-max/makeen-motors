import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type Client = SupabaseClient<Database>;

export function profilesTable(client: Client) {
  return client.from("profiles");
}

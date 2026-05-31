const URL_KEY = "NEXT_PUBLIC_SUPABASE_URL";
const ANON_KEY = "NEXT_PUBLIC_SUPABASE_ANON_KEY";

export function getSupabaseEnv() {
  const url = process.env[URL_KEY]?.trim();
  const anonKey = process.env[ANON_KEY]?.trim();

  if (!url) {
    throw new Error(
      `${URL_KEY} is missing. Copy .env.local.example to .env.local and set your Project URL from Supabase Dashboard → Project Settings → API.`
    );
  }

  if (!anonKey) {
    throw new Error(
      `${ANON_KEY} is missing. Copy .env.local.example to .env.local and set the anon public key from Supabase Dashboard → Project Settings → API.`
    );
  }

  return { url, anonKey };
}

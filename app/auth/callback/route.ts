import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { Database } from "@/types/database";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { supabaseDbOptions } from "@/lib/supabase/config";
import { resolvePostAuthRedirect } from "@/lib/profile/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code  = searchParams.get("code");
  const next  = searchParams.get("next") ?? "/";
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(`${origin}/sign-in?error=${encodeURIComponent(error)}`);
  }

  if (code) {
    const cookieStore = await cookies();
    const { url, anonKey } = getSupabaseEnv();

    const supabase = createServerClient<Database>(url, anonKey, {
      ...supabaseDbOptions,
      cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (!exchangeError) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const dest = user
        ? await resolvePostAuthRedirect(user.id, next)
        : next;
      return NextResponse.redirect(`${origin}${dest}`);
    }
  }

  return NextResponse.redirect(`${origin}/sign-in?error=auth_callback_failed`);
}

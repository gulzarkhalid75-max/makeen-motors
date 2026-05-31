"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, Session, AuthError, SupabaseClient } from "@supabase/supabase-js";

// ── Types ─────────────────────────────────────────────────────

interface AuthCtx {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (
    email: string,
    password: string,
    meta?: Record<string, unknown>
  ) => Promise<{ error: AuthError | null; session: Session | null }>;
  signInWithGoogle: (redirectPath?: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
}

// ── Context ───────────────────────────────────────────────────

const Ctx = createContext<AuthCtx>({} as AuthCtx);

// ── Provider ──────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabaseRef = useRef<SupabaseClient | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabaseRef.current = supabase;

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getClient = () => {
    if (!supabaseRef.current) {
      supabaseRef.current = createClient();
    }
    return supabaseRef.current;
  };

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await getClient().auth.signInWithPassword({ email, password });
    return { error };
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, meta?: Record<string, unknown>) => {
      const { error, data } = await getClient().auth.signUp({
        email,
        password,
        options: { data: meta },
      });
      return { error, session: data.session };
    },
    []
  );

  const signInWithGoogle = useCallback(async (redirectPath = "/") => {
    const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectPath)}`;
    const { error } = await getClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl },
    });
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    await getClient().auth.signOut();
  }, []);

  return (
    <Ctx.Provider
      value={{ user, session, loading, signIn, signUp, signInWithGoogle, signOut }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  return useContext(Ctx);
}

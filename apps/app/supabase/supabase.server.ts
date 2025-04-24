import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface SupabaseServerClient {
  headers: Headers;
  client: SupabaseClient;
}

export function createSupabaseServerClient(request: Request) {
  const headers = new Headers();
  const supabase = {
    headers: headers,
    client: createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        cookies: {
          getAll() {
            return parseCookieHeader(request.headers.get("Cookie") ?? "");
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              headers.append(
                "Set-Cookie",
                serializeCookieHeader(name, value, options)
              )
            );
          },
        },
      }
    ),
  };
  return supabase;
}

// サーバーサイドで利用するSupabaseクライアントを作成
export const getSupabaseClient = (request: Request): SupabaseClient => {
  const supabaseClient = createSupabaseServerClient(request);
  return supabaseClient.client;
};

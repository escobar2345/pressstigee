import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  // NOTE: /admin auth is intentionally NOT checked here.
  //
  // The old code checked request.cookies.get("prestiige_admin_access") —
  // but that cookie is set by the Python backend on backend-acend.onrender.com,
  // a DIFFERENT domain from this Next.js app (pressstigee.vercel.app).
  // Cookies are scoped per-domain: a cookie set by onrender.com is never
  // included in requests made to vercel.app, no matter what SameSite/Secure
  // settings are used. That check could never succeed, which is why every
  // visit to /admin/* was redirected straight back to /admin/login.
  //
  // Auth for /admin is instead checked client-side in AdminGuard.tsx,
  // which calls the backend's /auth/api/me endpoint DIRECTLY from the
  // browser — that request goes to onrender.com, so the cookie is
  // actually present and can be validated correctly.

  if (request.nextUrl.pathname.startsWith("/partner")) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set(
        "redirectedFrom",
        `${request.nextUrl.pathname}${request.nextUrl.search}`
      );
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/partner/:path*"],
};

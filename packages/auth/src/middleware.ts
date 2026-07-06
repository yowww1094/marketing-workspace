import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest, isProtectedRoute: boolean = true) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log("Middleware Executing. Path:", request.nextUrl.pathname, "User ID:", user?.id);

  if (isProtectedRoute && !user && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/register') && !request.nextUrl.pathname.startsWith('/forgot-password') && !request.nextUrl.pathname.startsWith('/reset-password') && !request.nextUrl.pathname.startsWith('/auth')) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    const redirectResponse = NextResponse.redirect(url);
    
    // Pass the cookies we just set in supabaseResponse to the redirect response
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });

    return redirectResponse;
  }

  // If user is logged in and tries to access login/register, redirect to dashboard
  if (user && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register') || request.nextUrl.pathname.startsWith('/forgot-password') || request.nextUrl.pathname.startsWith('/reset-password'))) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    const redirectResponse = NextResponse.redirect(url);
    
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });

    return redirectResponse;
  }

  return supabaseResponse;
}

import { getIronSession } from "iron-session/edge";
import { NextResponse, userAgent } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

export const middleware = async (req: NextRequest, event: NextFetchEvent) => {
  const url = req.nextUrl;
  const { isBot } = userAgent(req);

  //유저가 봇인 경우
  if (isBot) {
    return new Response("봇 진입 금지!", { status: 403 });
  }

  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "carrotsesison",
    password: process.env.COOKIE_ENCRYPT_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV! === "production", // if you are using https
    },
  });

  //로그인한 유저 /login 접근막기
  if (session.user && req.url.includes("/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // /login페이지를 제외한 모든 페이지에서 아이언세션의 세션유저 쿠키가 없으면 /login로 리다이렉트
  // /login 페이지는 빼고 리다이렉트 해줘야 리다이렉트 많아서 발생하는 오류 안남
  if (!session.user && !req.url.includes("/login")) {
    url.searchParams.set("from", url.pathname);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
};

// /login에서 로그인폼에 유저가 입력 시 api가 작동(/api/users/login)하는데 아직 쿠키가 없으므로 /login로 리다이렉트 되버린다
// 따라서 matcher를 설정하여 해당 url에서만 미들웨어가 작동하도록 설정
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api/users 루트 (API routes)로 해놓긴 했는데 일단 한 번 더 생각해 보기
   * - api/auth oAuth 루트도 제외
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!api/users|api/auth|_next/static|_next/image|favicon.ico).*)"],
};

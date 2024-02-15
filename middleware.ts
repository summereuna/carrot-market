import { NextResponse, userAgent } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

export function middleware(req: NextRequest, event: NextFetchEvent) {
  const url = req.nextUrl;
  const { isBot } = userAgent(req);

  //유저가 봇인 경우
  if (isBot) {
    return new Response("봇 진입 금지!", { status: 403 });
  }

  // /enter페이지를 제외한 모든 페이지에서 유저 쿠키가 없으면 /enter로 리다이렉트
  // /enter 페이지는 빼고 리다이렉트 해줘야 리다이렉트 많아서 발생하는 오류 안남
  if (!req.cookies.has("carrotsesison") && !req.url.includes("/enter")) {
    url.searchParams.set("from", url.pathname);
    url.pathname = "/enter";
    return NextResponse.redirect(url);
  }
}

// /enter에서 로그인폼에 유저가 입력 시 api가 작동(/api/users/enter)하는데 아직 쿠키가 없으므로 /enter로 리다이렉트 되버린다
// 따라서 matcher를 설정하여 해당 url에서만 미들웨어가 작동하도록 설정
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

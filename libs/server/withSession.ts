import { withIronSessionApiRoute } from "iron-session/next";

//타입스크립트에게 req.session에 user있다고 알리기위해
//iron session에 session type 정의하기
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotsesison",
  password: process.env.COOKIE_ENCRYPT_PASSWORD!, //확실히 있다고 알리기
};

/**
 * API route에서 session 받아오기 위한 함수
 * @param fn
 * @returns withIronSessionApiRoute(fn, cookieOptions);
 */
export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

// 페이지 렌더링할 때 next.js의 Server Side Rendering에서 session 받아오는 함수

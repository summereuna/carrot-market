import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

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
 * iron session 사용하여 API route 안에서 session 받아와서 인증하는 함수이다.
 * iron session에 req 오브젝트를 제공하여, iron session이 req 안에 든 쿠키를 가져와서 해독한 후 req.session.user에 결과 값을 넣어주는 일을 한다.
 * @param fn
 * @returns withIronSessionApiRoute(fn, cookieOptions);
 */
export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

/**
 * iron session 사용하여 Server Side(getServerSideProps())에서 session 인증하는 함수
 //페이지 렌더링할 때 next.js의 Server Side Rendering에서 session 받아오는 함수
 * @param handler
 * @returns withIronSessionSsr(handler, cookieOptions);
 */
export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieOptions);
}

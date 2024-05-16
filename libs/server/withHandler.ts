import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "PUT" | "DELETE";

//인자 많아져서 객체로 따로 빼고 타입 설정
interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

//withHandler함수는 고차함수
export default function withHandler({
  methods,
  handler,
  isPrivate = true, //대부분의 api 프라이빗(로그인)이므로 기본값 true
}: ConfigType) {
  //사용자가 api request를 보내면 nextJS가 실행할 handler을 반환해줘야 한다.
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    //1. req.method가 있는지 확인 && methods 배열 안에 any 타입의 req.method 없는지 확인하면 오류
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).end();
    } //이렇게 하면 handler 펑션을 bad request로 부터 보호할 수 있다.

    //2. 로그인 했는지 체크
    //401은 인증되지 않은 요청
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "로그인 해주세요." });
    }

    //3. 올바른 메서드 && isPrivate && 로그인 했으면 아래 코드 실행
    try {
      await handler(req, res);
      //이때 handler 펑션이 실행됨 ㅇㅇ!
    } catch (error) {
      // console.log(error);
      return res.status(500).json({ error }); //서버 에러: 500
    }
  };
}

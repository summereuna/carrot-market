import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

//withHandler함수는 고차함수
export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  //사용자가 api request를 보내면 nextJS가 실행할 fn을 반환해줘야 한다.
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    //내가 원하는 메소드가 아닌 경우
    if (req.method !== method) {
      return res.status(405).end();
    } //이렇게 하면 handler 펑션을 bad request로 부터 보호할 수 있다.
    try {
      await fn(req, res);
      //이때 handler 펑션이 실행됨 ㅇㅇ!
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error }); //서버 에러: 500
    }
  };
}

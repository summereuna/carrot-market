import client from "@/libs/client/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //api route가 받은 req.body에서 토큰 가져오기
  const { token } = req.body;
  console.log(token);

  //res 반환
  return res.status(200).end();
}

export default withHandler("POST", handler);
//withHandler(HTTP 메소드, handler 함수)
//외부에서 핸들러 함수를 고차 함수에 인자로 전달하여 더 유연하게 사용 가능

import client from "@/libs/client/client";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //form정보 정상적으로 받고 있는지 확인하기 위해 백엔드에 콘솔찍기
  console.log(req.body);
  return res.status(200).end();
}

export default withHandler("POST", handler);
//withHandler(HTTP 메소드, handler 함수)
//외부에서 핸들러 함수를 고차 함수에 인자로 전달하여 더 유연하게 사용 가능

import client from "@/libs/client/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //api route가 받은 req.body에서 폰이나 이메일 둘 중 하나 가져오기
  const { email, phone } = req.body;

  const userEnterInfo = email ? { email } : phone ? { phone: +phone } : null;

  //유저 입력정보 null이면 배드리퀘스트 보내기
  if (!userEnterInfo) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  //토큰 생성
  const token = await client.token.create({
    data: {
      payload,
      user: {
        //connect는 새로운 토큰을 이미 존재하는 유저와 연결
        //create는 새로운 토큰과 새로운 유저 생성
        //connectOrCreate 는 유저를 찾아서 토큰 연결하므로 위의 코드 없어도 됨
        connectOrCreate: {
          //유저가 있으면 페이로드(이메일/폰넘버) 넣어주기
          where: { ...userEnterInfo },
          //유저가 없으면 유저 새로 만들고, 유저에 토큰 연결
          create: {
            name: "익명",
            ...userEnterInfo,
          },
        },
      },
    },
  });

  return res.json({ ok: true });
}

export default withHandler("POST", handler);
//withHandler(HTTP 메소드, handler 함수)
//외부에서 핸들러 함수를 고차 함수에 인자로 전달하여 더 유연하게 사용 가능

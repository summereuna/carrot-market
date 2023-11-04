import client from "@/libs/client/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //api route가 받은 req.body에서 토큰 가져오기
  const { token } = req.body;
  //프리즈마로 토큰 가진 유저 찾고, 있으면 유저 정보 req.session.user에 담아보자
  //1. 프리즈마로 req.body로 받은 token을 payload로 가지는 token 찾기
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    //유저가져오기
    //include: { user: true },
  });

  //2. 존재하는지 확인
  //존재하지 않으면 null리턴
  if (!foundToken) return res.status(404).end();

  //3. 존재하면 해당 토큰 가진 유저의 id를 세션의 user에 저장
  req.session.user = {
    id: foundToken.userId,
  };

  //세션 데이터 암호화하고 쿠키 설정해 저장
  await req.session.save();

  //유저에게 응답하기 전에 토큰의 userId와 같은 userId를 가진 token 전부 삭제
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  //응답
  res.json({ ok: true });
}

export default withApiSession(withHandler("POST", handler));
//withHandler(HTTP 메소드, handler 함수)
//외부에서 핸들러 함수를 고차 함수에 인자로 전달하여 더 유연하게 사용 가능

//쿠키 암호화 하는데 쓰일 비번 (최소 32자 이상)
//https://1password.com/password-generator/ 사용하면 랜덤 비번 생성됨

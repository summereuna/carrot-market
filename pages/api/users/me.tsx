import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/client/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //콘솔에서 user의 id 보는게 목표
  //console.log(req.session.user);

  //req.session.user에 있는 id 사용하여 유저 데이터 찾아오기
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  //응답 json애 유저 데이터 담아서 보내기
  res.json({ ok: true, profile });
}

//왜 감싸줘야 되냐면
//모든 API는 실제 백엔드 없이(serverless) 개별적으로 동작하기 때문애 각 API마다 type과 withIronSessionApiRoute config를 매번 설정해줘야 한다.
//브라우저에 있는 쿠키의 세션에 userId가 저장되어 있기 때문에 프리즈마로 해당 id를 가진 user의 정보를 가져올 수 있다.

//GET으로 해야 req.session.user 가져올 수 있음
export default withApiSession(withHandler("GET", handler));

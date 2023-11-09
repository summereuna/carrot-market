import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/client/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // products upload form의 데이터
  // req.session의 유저
  const {
    body: { name, price, description, image },
    session: { user },
  } = req;

  //프로덕트 모델에 데이터 넣어서 생성하기
  const product = await client.product.create({
    // 데이터 넣기
    data: {
      name,
      price: +price, //form 업로드하면 전부 string 되서 에러나니까 + number로 바꿔주기
      description,
      image: "", //아직 구현 안함
      user: { connect: { id: user?.id } }, //현재 로그인한 세션 유저의 유저db와 연결
    },
  });

  //응답 json에 ok와 product 보내기
  res.json({ ok: true, product });
}

export default withApiSession(withHandler({ method: "POST", handler }));

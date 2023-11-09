import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/client/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //프론트엔드에 router.query 있는 것 처럼, 백엔드엔 req.query 있음
  // console.log(req.query);
  const { id } = req.query;

  //req.query로 부터 오는 id의 타입이 string | string[] | undefined 이기 때문에
  //아래에서 id로 찾을 때 .toString()써서 스트링으로 찾고,
  //id는 숫자로 랜덤 생성되니까 + 붙이기
  //스트링 배열일 수 있는 이유: route에 id가 여러개 붙는 경우 때문, [...id] catch-all route인 경우, /1/32/3 뭐 이런식

  //id가 string | string[] 만되게 id가 있는 경우만 실행
  //그러고 나서 id를 number로 변경 +
  if (id) {
    const product = await client.product.findUnique({
      where: {
        id: +id.toString(),
      },
      //유저 연결
      //include: { user: true },

      //필요한 유저 데이터만 요청
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });

    // console.log(product);
    res.json({
      ok: true,
      product,
    });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

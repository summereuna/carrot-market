import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    //프로덕트db 가져오기
    const products = await client.product.findMany({
      //다 가져오기
      //거기에 wishes 카운트도 포함해서
      include: {
        _count: {
          select: { wishes: true },
        },
        reservation: { select: { id: true } },
        review: { select: { id: true } },
      },
      orderBy: { created: "desc" },
    });

    res.json({
      ok: true,
      products,
    });
  }

  if (req.method === "POST") {
    // products upload form의 데이터
    // req.session의 유저
    const {
      body: { name, price, description, productImageUrl },
      session: { user },
    } = req;

    //프로덕트 모델에 데이터 넣어서 생성하기
    const product = await client.product.create({
      // 데이터 넣기
      data: {
        name,
        price,
        description,
        image: productImageUrl,
        user: { connect: { id: user?.id } }, //현재 로그인한 세션 유저의 유저db와 연결
      },
    });

    const sale = await client.sale.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: product.id, //여기서 바로 만들 수 있나?
          },
        },
      },
    });

    //응답 json에 ok와 product 보내기
    res.json({ ok: true, product, sale });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

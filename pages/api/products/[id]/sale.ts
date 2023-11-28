import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

// 판매 올리면 /products/[id]/sold 로 요청 보내서 판매자 sold 리스트에 띄우기

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //프론트엔드에 router.query 있는 것 처럼, 백엔드엔 req.query 있음
  // 프로덕트 아이디와 유저의 아이디 필요
  const {
    query: { id },
    session: { user },
  } = req;

  //프로덕트 있는지 확인, 없으면 404
  const isProductExist = await client.product.findUnique({
    where: { id: +id!.toString() },
    select: { id: true },
  });

  if (!isProductExist) {
    return res
      .status(404)
      .json({ ok: false, error: "존재하지 않는 상품 입니다." });
  }

  // //해당 상품이 db의 유저와 상품의 sale 리스트에 존재하는지 체크
  // const alreadyExistsSale = await client.sale.findFirst({
  //   where: {
  //     userId: user?.id,
  //     productId: +id!.toString(),
  //   },
  // });
  // //sale 레코드 찾아서 확인했으니 sale id도 가지고 있는 상태

  // //존재하면 데이터 지우기 / 존재하지 않으면 생성
  // if (alreadyExistsSale) {
  //   //지우기
  //   //delete()는 unique 필드로만 삭제가능함. id를 위에서 찾아놨으니 사용 가능
  //   await client.sale.delete({
  //     where: { id: alreadyExistsSale.id },
  //   });
  // } else {
  //   await client.sale.create({
  //     data: {
  //       user: {
  //         connect: {
  //           id: user?.id,
  //         },
  //       },
  //       product: {
  //         connect: {
  //           id: +id!.toString(),
  //         },
  //       },
  //     },
  //   });
  // }
  await client.sale.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      product: {
        connect: {
          id: +id!.toString(),
        },
      },
    },
  });

  res.json({
    ok: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

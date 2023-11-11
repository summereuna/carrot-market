import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/client/client";
import { withApiSession } from "@/libs/server/withSession";

// /products/[id]/wish 로 요청 보내서 + wish - wish

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

  //해당 상품이 db의 유저와 상품의 wishes 리스트에 존재하는지 체크
  const alreadyExistsWish = await client.wish.findFirst({
    where: {
      userId: user?.id,
      productId: +id!.toString(),
    },
  });
  //wish 레코드 찾아서 확인했으니 wish의 id도 가지고 있는 상태

  //존재하면 데이터 지우기 / 존재하지 않으면 생성
  if (alreadyExistsWish) {
    //지우기
    //delete()는 unique 필드로만 삭제가능함. id를 위에서 찾아놨으니 사용 가능
    await client.wish.delete({
      where: { id: alreadyExistsWish.id },
    });
  } else {
    await client.wish.create({
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
  }

  res.json({
    ok: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

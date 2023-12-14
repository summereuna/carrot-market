import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { date },
    query: { id }, //프로덕트
    session: { user },
  } = req;

  if (req.method === "GET") {
    const productReservation = await client.product.findUnique({
      where: { id: +id!.toString() },
      select: { reservation: true },
    });

    return res.json({
      ok: true,
      productReservation,
    });
  }

  if (req.method === "POST") {
    //프로덕트 있는지 확인 있는지 확인, 없으면 404
    const isProductExist = await client.product.findUnique({
      where: { id: +id!.toString() },
      select: { id: true },
    });

    if (!isProductExist) {
      return res.status(404).json({
        ok: false,
        error: "상품이 존재하지 않아 예약을 진행할 수 없습니다.",
      });
    }

    //내가 해당 상품 이미 reservation 했는지 안했는지 체크
    const alreadyExistsReservation = await client.reservation.findFirst({
      where: {
        userId: user?.id,
        productId: +id!.toString(),
      },
    });
    //reservation 찾아서 확인했으니 reservation의 id도 가지고 있는 상태

    //존재하면 데이터 업데이트 혹은 삭제
    //존재하지 않으면 생성
    if (alreadyExistsReservation) {
      //업데이트
      if (date) {
        const reservation = await client.reservation.update({
          where: { id: alreadyExistsReservation.id },
          data: {
            date,
          },
        });

        return res.json({
          ok: true,
          reservation,
        });
      } else {
        //삭제
        //지우기
        //delete()는 unique 필드로만 삭제가능함. id를 위에서 찾아놨으니 사용 가능
        await client.reservation.delete({
          where: { id: alreadyExistsReservation.id },
        });

        return res.json({
          ok: true,
        });
      }
    } else {
      const reservation = await client.reservation.create({
        data: {
          date,
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

      return res.json({
        ok: true,
        reservation,
      });
    }
  }
}
export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

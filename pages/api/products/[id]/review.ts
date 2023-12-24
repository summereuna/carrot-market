import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { kind, review, reviewCheckBoxes, score, createdForId },
    query: { id }, //프로덕트
    session: { user },
  } = req;

  if (req.method === "GET") {
    const productReservationInfo = await client.product.findUnique({
      where: { id: +id!.toString() },
      select: {
        name: true,
        image: true,
        userId: true, //판매자 아이디
        user: { select: { name: true } }, //판매자 이름
        reservation: { select: { date: true, productId: true, userId: true } }, // userId: 구매한 사람 id
      },
    });

    return res.json({
      ok: true,
      productReservationInfo,
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

    //내가 예약한 상품인지 확인
    const alreadyExistsReservation = await client.reservation.findFirst({
      where: {
        userId: user?.id,
        productId: +id!.toString(),
      },
    });

    //내가 예약했던 상품이 아니면
    if (!alreadyExistsReservation) {
      return res.status(404).json({
        ok: false,
        error: "해당 상품을 거래하지 않았습니다.",
      });
    } else {
      const sendReviewToSeller = await client.review.create({
        data: {
          kind,
          review,
          reviewCheckBoxes,
          score,
          createdBy: { connect: { id: user?.id } },
          createdFor: { connect: { id: createdForId } },
          product: {
            connect: {
              id: +id!.toString(),
            },
          },
        },
      });

      //판매자가 후기 보내는건 따로 만들어야 하나 생각 좀

      return res.json({
        ok: true,
        sendReviewToSeller,
      });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

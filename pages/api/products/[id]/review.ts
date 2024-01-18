import { User } from "@prisma/client";
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
    const productInfo = await client.product.findUnique({
      where: { id: +id!.toString() },
      select: {
        name: true,
        image: true,
        userId: true, //판매자 아이디
        user: { select: { name: true } }, //판매자 이름
        reservation: {
          select: {
            date: true,
            productId: true,
            userId: true,
            user: { select: { name: true } },
          },
        }, // userId: 구매한 사람 id
      },
    });

    if (user?.id !== productInfo?.userId) {
      //구매자인 경우
      const reviewInfo = await client.review.findFirst({
        where: {
          createdById: user?.id,
          createdForId: productInfo?.userId, //판매자에게
          productId: +id!.toString(),
        },
        select: {
          product: { select: { name: true } },
          kind: true,
          review: true,
          reviewCheckBoxes: true,
          createdFor: { select: { name: true } },
        },
      });

      return res.json({
        ok: true,
        productInfo,
        reviewInfo,
      });
    } else {
      //판매자인 경우
      const reviewInfo = await client.review.findFirst({
        where: {
          createdById: user?.id,
          createdForId: productInfo?.reservation?.userId, //구매자에게
          productId: +id!.toString(),
        },
        select: {
          product: { select: { name: true } },
          kind: true,
          review: true,
          reviewCheckBoxes: true,
          createdFor: { select: { name: true } },
        },
      });
      return res.json({
        ok: true,
        productInfo,
        reviewInfo,
      });
    }
  }

  if (req.method === "POST") {
    //프로덕트 있는지 확인 있는지 확인, 없으면 404
    const isProductExist = await client.product.findUnique({
      where: { id: +id!.toString() },
      select: {
        id: true,
        userId: true,
        reservation: { select: { userId: true } },
      },
    });

    if (!isProductExist) {
      return res.status(404).json({
        ok: false,
        error: "상품이 존재하지 않아 예약을 진행할 수 없습니다.",
      });
    }

    //내가 상품 판매자인 경우 && 리뷰 받는 사람이 예약자인 경우
    if (
      user?.id === isProductExist.userId &&
      createdForId === isProductExist.reservation?.userId
    ) {
      await client.review.create({
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

      return res.json({
        ok: true,
      });
    }

    //내가 예약한 상품인지 확인
    const alreadyExistsReservation = await client.reservation.findFirst({
      where: {
        userId: user?.id,
        productId: +id!.toString(),
      },
    });

    //내가 상품 구매자인 경우 && 내가 예약했던 상품인 경우
    if (!alreadyExistsReservation && user?.id !== isProductExist.userId) {
      return res.status(404).json({
        ok: false,
        error: "해당 상품을 거래하지 않았습니다.",
      });
    } else {
      await client.review.create({
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

      return res.json({
        ok: true,
      });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

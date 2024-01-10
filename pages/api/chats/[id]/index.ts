import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req;

  const chats = await client.chatRoom.findUnique({
    where: {
      id: +id!.toString(),
    },
    select: {
      user: { select: { name: true } },
      product: {
        select: {
          name: true,
          image: true,
          price: true,
          id: true,
          reservation: {
            select: {
              date: true,
              id: true,
              userId: true,
              user: { select: { name: true } },
              updated: true,
            },
          },
          user: { select: { name: true } },
          userId: true,
          review: { select: { id: true } },
        },
      },
      chats: {
        select: {
          id: true,
          chat: true,
          created: true,
          user: { select: { id: true, avatar: true } },
          isReservedAlarm: true,
        },
      },
    },
  });

  res.json({
    ok: true,
    chats,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

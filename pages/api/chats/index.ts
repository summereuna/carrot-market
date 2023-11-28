import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const chats = await client.chatRoom.findMany({
      select: {
        id: true,
        updated: true,
        chats: { select: { chat: true, created: true } },
        user: { select: { name: true, avatar: true, id: true } },
        product: {
          select: { user: { select: { name: true, avatar: true, id: true } } },
        },
      },
      orderBy: { created: "asc" },
    });

    return res.json({
      ok: true,
      chats,
    });
  }
  if (req.method === "POST") {
    const {
      body: { productId },
      session: { user },
    } = req;

    const chatRoom = await client.chatRoom.create({
      data: {
        product: { connect: { id: +productId } },
        user: { connect: { id: user?.id } },
      },
    });

    return res.json({ ok: true, chatRoom });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

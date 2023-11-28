import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body,
    query: { id }, //현재 챗룸.id
    session: { user }, // 글 쓴 유저
  } = req;

  const chats = await client.chat.create({
    data: {
      chat: body.chat,
      user: { connect: { id: user?.id } },
      chatRoom: { connect: { id: +id!.toString() } },
    },
  });

  return res.json({ ok: true, chats });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

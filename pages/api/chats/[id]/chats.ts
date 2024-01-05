import { ChatRoom } from "@prisma/client";
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
      isReservedAlarm: false,
      user: { connect: { id: user?.id } },
      chatRoom: { connect: { id: +id!.toString() } },
    },
  });

  //채팅룸 업데이트> 채팅룸에 챗 생기면 업뎃 시키고 싶은데 걍 updatedAt만 바뀌게..어떻게 하지
  await client.chatRoom.update({
    where: { id: +id!.toString() },
    data: {
      updated: new Date(),
    },
  });

  return res.json({ ok: true, chats });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

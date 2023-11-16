import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;

  const wishes = await client.wish.findMany({
    where: { userId: user?.id },
    include: {
      product: {
        include: {
          _count: { select: { wishes: true } },
        },
      },
    },
  });

  res.json({ ok: true, wishes });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

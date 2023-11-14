import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/client/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;

  const purchases = await client.purchase.findMany({
    where: { userId: user?.id },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          description: true,
          userId: true,
          _count: { select: { purchases: true } },
        },
      },
    },
  });

  res.json({ ok: true, purchases });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

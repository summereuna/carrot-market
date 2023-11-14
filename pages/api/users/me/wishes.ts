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

  const myWishes = await client.wish.findMany({
    where: { userId: user?.id },
    include: { product: true },
  });

  res.json({ ok: true, myWishes });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

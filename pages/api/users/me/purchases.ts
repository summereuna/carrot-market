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

  const myPurchases = await client.purchase.findMany({
    where: { userId: user?.id },
    include: { product: true },
  });

  res.json({ ok: true, myPurchases });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    // session: { user },
    query: { id }, //유저
  } = req;

  const sales = await client.sale.findMany({
    where: { userId: +id!.toString() },
    include: {
      product: {
        include: {
          _count: { select: { wishes: true } },
        },
      },
    },
    orderBy: { created: "desc" },
  });

  res.json({ ok: true, sales });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

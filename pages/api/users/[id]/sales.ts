import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id }, //유저
  } = req;

  const sales = await client.sale.findMany({
    where: { userId: +id!.toString() },
    include: {
      product: {
        include: {
          reservation: { select: { id: true } },
          review: { select: { id: true } },
          _count: { select: { wishes: true } },
        },
      },
    },
    orderBy: { created: "desc" },
  });

  const user = await client.user.findUnique({
    where: { id: +id!.toString() },
    select: { id: true, name: true, avatar: true },
  });

  res.json({ ok: true, user, sales });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

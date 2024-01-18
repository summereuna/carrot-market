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

  const profile = await client.user.findUnique({
    where: { id: +id!.toString() },
    include: { receivedReviews: true },
  });

  const reviews = await client.review.findMany({
    where: { createdForId: +id!.toString() },
    include: {
      createdBy: { select: { id: true, name: true, avatar: true } },
    },
  });

  return res.json({ ok: true, profile, reviews });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

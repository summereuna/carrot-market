import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/client/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const streams = await client.stream.findMany();

    return res.json({
      ok: true,
      streams,
    });
  }

  if (req.method === "POST") {
    const {
      body: { name, price, description },
      session: { user },
    } = req;

    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: { connect: { id: user?.id } },
      },
    });

    return res.json({ ok: true, stream });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const {
      query: { page, limit },
    } = req;

    const pageIndex = Number(page);
    const pageLimit = Number(limit);

    const streams = await client.stream.findMany({
      select: { name: true, id: true /*나중에 비디오 넣어줘야 함 */ },
      take: pageLimit,
      skip: (pageIndex - 1) * pageLimit,
      orderBy: { created: "desc" },
    });

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

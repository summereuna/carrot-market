import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";
// import { NextResponse } from "next/server";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
  } = req;

  const profile = await client.user.findUnique({
    where: { id: +id!.toString() },
  });

  const reviews = await client.review.findMany({
    where: { createdForId: +id!.toString() },
    include: {
      createdBy: { select: { id: true, name: true, avatar: true } },
    },
  });

  if (!profile) {
    // const url = req.nextUrl.clone();
    // url.pathname = `/404`;
    // return NextResponse.rewrite(url);
    // return NextResponse.rewrite("/404");
    //프로필 없으면 404 띄워주고 싶은데 어떻게 해야 하지?
    return res.status(200).json({
      ok: false,
      notFound: true,
    });
  }

  return res.json({ ok: true, profile, reviews });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

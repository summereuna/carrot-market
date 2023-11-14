import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/client/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    //포스트 db가져오기: 실제 프로덕션에서는 페이지네이션 하는게 좋음
    const posts = await client.post.findMany({
      //다 가져오기
      //거기에 추천, 답변 카운트도 포함해서
      include: {
        _count: {
          select: { recommendations: true, answers: true },
        },
        user: { select: { name: true, id: true, avatar: true } },
      },
    });

    res.json({
      ok: true,
      posts,
    });
  }

  if (req.method === "POST") {
    // 동네생활 write form의 post 데이터
    // req.session의 유저
    const {
      body: { title, content, latitude, longitude },
      session: { user },
    } = req;

    //post 모델에 데이터 넣어서 생성하기
    const post = await client.post.create({
      // 데이터 넣기
      data: {
        title,
        content,
        latitude,
        longitude,
        user: { connect: { id: user?.id } }, //현재 로그인한 세션 유저의 유저db와 연결
      },
    });

    //응답 json에 ok와 product 보내기
    res.json({ ok: true, post });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

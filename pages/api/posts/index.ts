import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    // req.query.id => /posts/[id]
    // req.query.params => /posts?params=lalala
    const {
      query: { latitude, longitude },
    } = req;

    const parsedLatitudeNumber = parseFloat(latitude!.toString());
    const parsedLongitudeNumber = parseFloat(longitude!.toString());

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

      //위치정보 범위 설정하여 포스트 필터링
      where: {
        latitude: {
          gte: parsedLatitudeNumber - 0.005, //gte: greater than equal 크거나 같거나
          lte: parsedLatitudeNumber + 0.005, //lte: less than equal 작거나 같거나
        },
        longitude: {
          gte: parsedLongitudeNumber - 0.005,
          lte: parsedLongitudeNumber + 0.005,
        },
      },
      orderBy: { created: "desc" },
    });

    return res.json({
      ok: true,
      posts,
    });
  }

  if (req.method === "POST") {
    // if (req.query.secret !== process.env.ODR_SECRET_TOKEN) {
    //   return res.status(401).json({ ok: false, message: "Invalid token" });
    // }

    try {
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

      //ISR & On Demand Revalidation(ODR)
      //재생성할 페이지 경로 "/community"
      await res.revalidate("/community");
      //응답 json에 ok와 product 보내기
      return res.json({ ok: true, post, revalidated: true });
    } catch (error) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).json({ ok: false, error: "Error revalidating" });
    }
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);

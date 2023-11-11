import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/client/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const post = await client.post.findUnique({
    where: {
      id: +id!.toString(),
    },

    //post에 필요한 user 데이터, _count 할 레코드 담기
    include: {
      user: { select: { id: true, name: true, avatar: true } },
      answers: {
        select: {
          answer: true,
          id: true,
          user: { select: { id: true, name: true, avatar: true } },
        },
      },
      _count: { select: { answers: true, recommendations: true } },
    },
  });

  //추천 눌렀는지 확인
  //조건 만족하는 recommendation 레코드의 첫 번째 아이템 찾기
  // postId 가 post.id와 같고 userId가 user.id와 같은
  //결과 값은 wish 레코드를 리턴하기 때문에 이를 boolean으로 감싸주기
  const isRecommend = Boolean(
    await client.recommendation.findFirst({
      where: {
        postId: post?.id,
        userId: user?.id,
      },
      select: { id: true },
      //DB를 좀 더 경제적으로 사용하기 위해 recommendation 레코드의 모든 필드 가져오지 않고 id만 가져오기
    })
  );

  // //Answer 가져오기
  // const answers = await client.answer.findMany({
  //   where: {
  //     postId: post?.id,
  //   },
  // });

  res.json({
    ok: true,
    post,
    isRecommend,
    //answers,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));

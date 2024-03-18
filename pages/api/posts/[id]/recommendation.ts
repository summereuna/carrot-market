import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

// /posts/[id]/recommendation 로 요청 보내서 + recommendation - recommendation

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //프론트엔드에 router.query 있는 것 처럼, 백엔드엔 req.query 있음
  // 프로덕트 아이디와 유저의 아이디 필요
  const {
    query: { id },
    session: { user },
  } = req;

  //post 존재하는지 확인
  const isPostExist = await client.post.findUnique({
    where: { id: +id!.toString() },
    select: { id: true },
  });

  if (!isPostExist) {
    return res
      .status(404)
      .json({ ok: false, error: "존재하지 않는 게시물 입니다." });
  }

  //해당 상품이 db의 유저와 상품의 recommendation 리스트에 존재하는지 체크
  const alreadyExistsRecommendation = await client.recommendation.findFirst({
    where: {
      userId: user?.id,
      postId: +id!.toString(),
    },
    select: { id: true },
  });
  //wish 레코드 찾아서 확인했으니 wish의 id도 가지고 있는 상태

  //존재하면 데이터 지우기 / 존재하지 않으면 생성
  if (alreadyExistsRecommendation) {
    //지우기
    //delete()는 unique 필드로만 삭제가능함. id를 위에서 찾아놨으니 사용 가능
    await client.recommendation.delete({
      where: { id: alreadyExistsRecommendation.id },
    });
  } else {
    await client.recommendation.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id!.toString(),
          },
        },
      },
    });
  }

  //⚠️ dev 환경에서 307 상태 에러 뜨는데 왜 그런지 모르겠음
  await res.revalidate(`/community`);

  return res.json({
    ok: true,
    revalidated: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

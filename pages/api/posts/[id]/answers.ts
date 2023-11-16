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
    session: { user },
    body: { answer },
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

  //해당 포스트 존재하면 answer 생성
  const newAnswer = await client.answer.create({
    data: {
      user: { connect: { id: user?.id } }, //현재 로그인한 세션 유저의 유저db와 연결
      post: { connect: { id: +id!.toString() } },
      answer,
    },
  });

  //응답 json에 ok 내기
  //이론상 newAnswer는 리턴할 필요는 없음 ㅇㅇ... url 리다이렉트 할 것이 없으므로..
  res.json({ ok: true, answer: newAnswer });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));

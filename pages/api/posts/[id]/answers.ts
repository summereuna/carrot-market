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
    body: { answer },
  } = req;

  //post 찾기  > 앤써 넣기
  const post = await client.post.findUnique({
    where: { id: +id!.toString() },
    select: { id: true },
  });

  if (!post) {
    return res.status(404); //게시물을 찾을 수 없습니다.
  }

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

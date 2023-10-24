import client from "@/libs/client/client";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //api route가 받은 req.body에서 폰이나 이메일 둘 중 하나 가져오기
  const { email, phone } = req.body;

  const payload = email ? { email } : { phone: +phone };
  //es6: 객체 안에서 if else 같은 기능 사용하기
  // email 있으면 { email: email } 리턴
  // phone 있으면 { phone: +phone } 리턴
  //form에서 넘긴 phone값은 string이라서 + 붙여서 number로 바꿔주기

  //생성하거나 수정할 때 upsert 사용
  const user = await client.user.upsert({
    //user의 email에 req.body로 넘겨준 email 있는지
    where: { ...payload }, //조건 따라 이메일할지 폰할지
    //없으면 새로 만들고 user 반환 받음
    create: {
      name: "익명",
      ...payload,
    },
    //있으면 유저 업데이트: 안할거니까 비워두기
    update: {},
  });

  //백엔드에서 유저 정보 콘솔에 찍어보기
  console.log(user);
  return res.status(200).end();
}

export default withHandler("POST", handler);
//withHandler(HTTP 메소드, handler 함수)
//외부에서 핸들러 함수를 고차 함수에 인자로 전달하여 더 유연하게 사용 가능

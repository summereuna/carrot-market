import client from "@/libs/client/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //req 메소드 확인하기
  if (req.method !== "POST") {
    res.status(401).end();
  }

  //form정보 정상적으로 받고 있는지 확인
  console.log(req.body);
  res.json({ ok: true });
}

// await client.user.create({
//   data: {
//     name: "test",
//     email: "test@test.com",
//   },
// });
// res.json({
//   ok: true,
// });

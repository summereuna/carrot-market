import client from "@/libs/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // await client.user.create({
  //   data: {
  //     name: "test",
  //     email: "test@test.com",
  //   },
  // });
  // res.json({
  //   ok: true,
  // });

  //req 메소드 확인하기
  if (req.method !== "POST") {
    res.status(401).end();
  }

  //form정보 정상적으로 받고 있는지 확인
  console.log(req.body.email || req.body.phone);
  res.status(200).end();
}

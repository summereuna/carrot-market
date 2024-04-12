import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";
import withHandler from "@/libs/server/withHandler";

interface ResponseUrlType {
  url: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseUrlType>
) {
  //   if (req.method === "POST") {
  // 깃허브 버튼 클릭 시 유저를 깃허브 로그인하는 장소로 리다이렉트 시키기
  const { code } = req.query;
  if (!code) {
    return res.status(404);
  }

  const accessTokenURL = "https://github.com/login/oauth/access_token";
  const accessTokenParams = {
    client_id: process.env.GITHUB_OAUTH_CLIENT_ID!,
    client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET!,
    code,
  };
  const formattedParams = new URLSearchParams(accessTokenParams).toString();
  const finalUrl = `${accessTokenURL}?${formattedParams}`;

  //   return res.json({ url: finalUrl });
  // return Response.json({ code });

  const accessTokenResponse = await fetch(finalUrl, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  const accessTokenData = await accessTokenResponse.json();

  if ("error" in accessTokenData) {
    return res.status(400).end();
  }

  //3. access_token 사용해서 github api에 request보내서 유저 정보 가져오기
  const { access_token } = accessTokenData;
  const githubUserResponse = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-cache", //nextJS는 기본적으로 GET req를 캐시한다. 캐시 필요 없으므로 이렇게 설정
  });

  const {
    login: name,
    id,
    avatar_url: avatar,
  } = await githubUserResponse.json();

  //깃헙 아이디 이미 있으면 겟 세션으로 로그인 ㄱ
  const user = await client.user.findUnique({
    where: {
      github_id: id.toString(),
    },
    select: { id: true },
  });

  //4. 존재하면 해당 토큰 가진 유저의 id를 세션의 user에 저장
  if (user) {
    req.session.user = {
      id: user.id,
    };
    //세션 데이터 암호화하고 쿠키 설정해 저장
    await req.session.save();
    return res.redirect("/");
  }

  //5. 존재하지 않는 경우
  const newUser = await client.user.create({
    data: {
      name,
      github_id: id.toString(),
      avatar,
    },
    select: { id: true },
  });

  req.session.user = {
    id: newUser.id,
  };
  //세션 데이터 암호화하고 쿠키 설정해 저장
  await req.session.save();
  return res.redirect("/");
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler, isPrivate: false })
);

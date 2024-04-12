import { NextApiRequest, NextApiResponse } from "next";

interface ResponseUrlType {
  url: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseUrlType>
) {
  if (req.method === "GET") {
    // 깃허브 버튼 클릭 시 유저를 깃허브 로그인하는 장소로 리다이렉트 시키기
    const baseURL = "https://github.com/login/oauth/authorize";
    const params = {
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID!,
      scope: "read:user, user:email", //깃헙에서 원하는 데이터가 뭔지
      allow_signup: "false", //깃헙에 가입을 허용할지: 깃헙 아이디 있는 경우에만으로 하자
    };
    //params를 url에 넣을 수 있도록 작업해야 함
    // ?client_id=어쩌고저쩌고 이런 식으로
    const formattedParams = new URLSearchParams(params).toString();
    // console.log(formattedParams.toString());
    //이제 이 파라미터를 사용해서 사용자에게 url을 보내면 된다.
    const finalUrl = `${baseURL}?${formattedParams}`;

    return res.json({ url: finalUrl });
  }
}

export default handler;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**로그인한 유저 프로필 가져오는 훅 */
export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();

  //한번 만 싫랭되도록 디펜던시 설정 []
  useEffect(() => {
    //"api/users/me" aoi url에서 데이터 불러올거임
    fetch("api/users/me")
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.ok === false) {
          //유저를 로그인 페이지로 리다이렉트 시키기
          //push말고 replace를 사용하면 브라우저에서 히스토리를 남기지 않울 수 있다.
          return router.replace("/enter");
        }
        //jsonData 있으면 유저 설정
        setUser(jsonData.profile);
      });
  }, [router]);

  return user;
}

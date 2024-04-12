import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}
/**데이터 불러와 그 데이터 리턴 */

//useSWR
//첫 번째 인자인 key: 요청 보낼 url
//**이 url이 api를 요청할 url이면서 캐시를 저장할 때 사용할 key이기 때문에 key라고 함
//두 번째 인자인 fetcher 함수: 첫번째 인자인 key에 입력된 url로 요청 보내는 함수

/**로그인한 유저 프로필 가져오는 훅
 * useUser호출 시 useSWR이 fetcher함수로 api 요청 처리함
 * 그리고 fetcher함수가 리턴된 data나 error가 useSWR에 들어옴
 */
export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("/api/users/me");
  const router = useRouter();

  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/login");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}

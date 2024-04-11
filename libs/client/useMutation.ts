import { useState } from "react";

//useMutation 상태 별 타입
interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

//useMutation 반환 값
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

/**
 * DB에 데이터 생성(POST)하는 함수
 * useMutation("/어떤 url을 mutate할지 알아야 함")
 * 그리고 훅에서 어레이받음
 * 배열의 첫 번째 요소는 호출할 수 있는 함수로, data를 백엔드에 POST 하면 데이터베이스의 상태를 mutate할수 있는 함수
 * 두 번째 요소는 loading, data, error를 포함한 객체
 */
export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  //상태: 로딩, 데이터, 에러
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<undefined | any>(undefined);
  // const [error, setError] = useState<undefined | any>(undefined);

  //api로 data POST로 fetch하는 함수
  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));

    //fetch
    //Uploading JSON data
    //POST프로토콜로 JSON인코딩된 데이터를 보내기 위해 fetch()를 사용한다.
    //body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 한다.
    //https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.json().catch(() => {
          console.log("POST fetch 오류 발생");
        })
      )
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((error) =>
        setState((prev) => ({ ...prev, error, loading: false }))
      );
  }

  //반환 값은 [] 어레이에 mutation함수와 상태 담은 객체
  return [mutation, { ...state }];
}

//useMutation()의 return type은 array임
//두 개의 아이템이 있음
//1. fn: 이 fn은 data를 받음, 즉 object를 받음
//2. {}

import { useState } from "react";

//useUpdate 상태 별 타입
interface UseUpdateState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

//useUpdate 반환 값
type UseUpdateResult<T> = [(data: any) => void, UseUpdateState<T>];

/**
 * DB에 데이터 업데이트(PUT)하는 함수
 * useUpdate("/어떤 url을 mutate할지 알아야 함")
 * 그리고 훅에서 어레이받음
 * 배열의 첫 번째 요소는 데이터베이스 data 상태를 update하기 위해 호출할 수 있는 함수이다.
 * 두 번째 요소는 loading, data, error를 포함한 객체
 */
export default function useUpdate<T = any>(url: string): UseUpdateResult<T> {
  //상태: 로딩, 데이터, 에러
  const [state, setState] = useState<UseUpdateState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function updateData(data: any) {
    setState((prev) => ({ ...prev, loading: true }));

    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.json().catch((error) => {
          console.log("PUT fetch 오류 발생:", error.message);
        })
      )
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((error) =>
        setState((prev) => ({ ...prev, error, loading: false }))
      );
  }

  //반환 값은 [] 어레이에 updateData함수와 상태 담은 객체
  return [updateData, { ...state }];
}

//useUpdate()의 return type은 array임
//두 개의 아이템이 있음
//1. fn: 이 fn은 data를 받음, 즉 object를 받음
//2. {}

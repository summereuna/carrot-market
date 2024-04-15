import { useState } from "react";

//useDelete 상태 별 타입
interface UseDeleteState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

//useDelete 반환 값
type UseDeleteResult<T> = [(data: any) => void, UseDeleteState<T>];

/**
 * DB에 데이터 삭제(DELETE)하는 함수
 * useDelete("/api 주소")
 * 배열의 첫 번째 요소는 data를 DELETE하여 데이터베이스의 data 삭제하는 함수로 데이터베이스의 data를 삭제할 때 호출할 수 있는 함수이다.
 * 두 번째 요소는 loading, data, error를 포함한 객체
 */
export default function useDelete<T = any>(url: string): UseDeleteResult<T> {
  //상태: 로딩, 데이터, 에러
  const [state, setState] = useState<UseDeleteState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function deleteData(data: any) {
    setState((prev) => ({ ...prev, loading: true }));

    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: null,
    })
      .then((response) =>
        response.json().catch((error) => {
          console.log("DELETE fetch 오류 발생:", error.message);
        })
      )
      .then((data) => setState((prev) => ({ ...prev, data, loading: false })))
      .catch((error) =>
        setState((prev) => ({ ...prev, error, loading: false }))
      );
  }

  //반환 값은 [] 어레이에 deleteData함수와 상태 담은 객체
  return [deleteData, { ...state }];
}

//useDelete()의 return type은 array임
//두 개의 아이템이 있음
//1. fn: 이 fn은 data를 받음, 즉 object를 받음
//2. {}

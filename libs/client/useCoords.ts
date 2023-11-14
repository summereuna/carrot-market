import { useEffect, useState } from "react";

interface UseCoordsState {
  latitude: number | null;
  longitude: number | null;
}

export default function useCoords() {
  const [coords, setCoords] = useState<UseCoordsState>({
    latitude: null,
    longitude: null,
  });

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    //console.log(coords);
    setCoords({ latitude, longitude });
  };

  useEffect(() => {
    //useCoords이 마운트 되면 네비게이터 호출
    navigator.geolocation.getCurrentPosition(onSuccess);

    //서버사이드에서 이 useEffect 실행되지 않아서
    //latitude,longitude가 null되어 500 에러 발생
    //✅ NextJs는 초기 상태값으로 시작한다! 따라서 위도경도 둘 다 null인 상태임
    //그래서 `/api/posts?latitude=${latitude}&longitude=${longitude}` null인 채로 생성됨
    //이를 방지하기 위해서는 프론트 엔드 쪽에서 위도경도 받아온 다음에 실행하게 하면 됨
  }, []);
  return coords;
}

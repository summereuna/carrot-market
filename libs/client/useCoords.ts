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
  }, []);
  return coords;
}

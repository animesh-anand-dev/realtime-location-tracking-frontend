import { useState, useEffect } from 'react';

export function useGeoLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const refresh = () => {
    setLocation(null);
    setError(null);
  };

  useEffect(() => {
    var watchId = null;
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    function handleSuccess(position) {
      const { latitude, longitude, heading } = position.coords;
      setLocation({ latitude, longitude, heading });
    }

    function handleError(error) {
      setError(error.message);
    }

    watchId = navigator.geolocation.watchPosition(handleSuccess, handleError);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error, refresh };
}
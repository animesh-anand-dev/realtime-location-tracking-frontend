import React, { useState } from 'react';

const ScreenWakeLockExample = () => {
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [wakeLockObj, setWakeLockObj] = useState(null);

  const requestWakeLock = async () => {
    try {
      // Check if the API is supported
      if ('wakeLock' in navigator) {
        const wakeLock = await navigator.wakeLock.request('screen');
        setWakeLockObj(wakeLock);
        setWakeLockActive(true);
        console.log('Screen wake lock is active');
      } else {
        console.error('Screen Wake Lock API is not supported');
      }
    } catch (err) {
      console.error('Failed to request wake lock:', err);
    }
  };

  const releaseWakeLock = () => {
    if (wakeLockObj) {
      wakeLockObj.release();
      setWakeLockObj(null);
      setWakeLockActive(false);
      console.log('Screen wake lock is released');
    }
  };

  return (
    <div>
      <h2>Screen Wake Lock Example</h2>
      <button onClick={requestWakeLock} disabled={wakeLockActive}>
        Request Wake Lock
      </button>
      <button onClick={releaseWakeLock} disabled={!wakeLockActive}>
        Release Wake Lock
      </button>
      {wakeLockActive && <p>Screen wake lock is active</p>}
    </div>
  );
};

export default ScreenWakeLockExample;

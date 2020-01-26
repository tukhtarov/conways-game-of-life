import React, { useState, useEffect, useRef } from 'react';

const useInterval = (callback, delay, gameStatus) => {

  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (gameStatus) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [gameStatus]);
}

export default useInterval
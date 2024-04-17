import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const initialTime = 24 * 60 * 60; // 24 hours in seconds
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // Decrease the time remaining by 1 second
  //     setTimeRemaining((prevTime) => prevTime - 1);
  //   }, 1000);

  //   // Cleanup the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []); // Empty dependency array to run the effect only once on mount

  const formatTime = (seconds: any) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}:${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds
    ).padStart(2, '0')}`;
  };

  return (
    <div>
      <p>{formatTime(timeRemaining)}</p>
    </div>
  );
};

export default CountdownTimer;

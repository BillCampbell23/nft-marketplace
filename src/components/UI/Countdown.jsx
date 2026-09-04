import React, { useEffect, useState } from "react";

const remaining = (expiryDate) => Math.max(0, expiryDate - Date.now());

const format = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    expiryDate ? remaining(expiryDate) : 0
  );

  useEffect(() => {
    if (!expiryDate) return undefined;

    setTimeLeft(remaining(expiryDate));
    const intervalId = setInterval(() => {
      const left = remaining(expiryDate);
      setTimeLeft(left);
      if (left === 0) clearInterval(intervalId);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryDate]);

  // Not every item has an expiry date, and an expired item shouldn't show 0h 0m 0s.
  if (!expiryDate || timeLeft === 0) return null;

  return <div className="de_countdown">{format(timeLeft)}</div>;
};

export default Countdown;

import React, { useState, useEffect } from "react";

const EasternTimeClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Function to get current Eastern Time
    const getEasternTime = () => {
      const options = {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      return formatter.format(new Date());
    };

    // Set initial time immediately
    setTime(getEasternTime());

    // Update every second
    const intervalId = setInterval(() => {
      setTime(getEasternTime());
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1>Current Eastern Time (US & Canada)</h1>
      <h2>{time}</h2>
    </div>
  );
};

export default EasternTimeClock;
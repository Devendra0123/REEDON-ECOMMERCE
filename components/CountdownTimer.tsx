'use client'

import React, { useState, useEffect } from 'react';

interface Props {
  fromDate: Date;
  endDate: Date;
}

function CountdownTimer({ fromDate, endDate }: Props) {
  const [remainingTime, setRemainingTime] = useState<number>(0);
const [hours, setHours] = useState<number>(0)
const [minutes, setMinutes] = useState<number>(0)
const [seconds, setSeconds] = useState<number>(0)

  const calculateRemainingTime = () => {
    const currentTime = new Date().getTime();
    const startTime = new Date(fromDate).getTime();
    const endTime = new Date(endDate).getTime();
 
if(startTime > currentTime){
  const difference = startTime - currentTime;
  const hr = Math.floor(difference / (1000 * 60 * 60));
  const min = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((difference % (1000 * 60)) / 1000);
  setHours(hr);
  setMinutes(min);
  setSeconds(sec);
}if(endTime > currentTime) {
  const difference = endTime - currentTime;
  const hr = Math.floor(difference / (1000 * 60 * 60));
  const min = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((difference % (1000 * 60)) / 1000);
  setHours(hr);
  setMinutes(min);
  setSeconds(sec);
} else {
  setRemainingTime(0);
}
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      calculateRemainingTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  console.log(hours,minutes,seconds)
  return (
    <div>
      {(hours > 0 || minutes > 0 || seconds > 0) ? (
        <div>
          <p>{fromDate.getTime() > new Date().getTime() ? 'Starts in' : 'Ends in'}</p>
          <div className="bg-yellow-400 p-[10px] font-bold">
            {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
          </div>
        </div>
      ) : (
        <div>Flash sale has ended</div>
      )}
    </div>
  );
}

export default CountdownTimer;

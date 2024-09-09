import { useState, useEffect } from "react";

export default function ProgressBar({timer}) {
  console.log(timer);
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(()=>{
    const interval = setInterval(() => {
      console.log('Interval')
      setRemainingTime((prevTime)=> prevTime - 10);
    }, 10);

    return () => { // 組建卸載後會執行這邊
      console.log('CLEAR TIME OUT');
      clearTimeout(interval);
    }
  },[]);

  return <progress max={timer} value={remainingTime} />
};
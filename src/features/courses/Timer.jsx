import React, { useEffect, useState } from 'react';

export default function Timer({ target, onZero }){
  const [secs, setSecs] = useState(0);
  useEffect(()=>{
    const targetDate = new Date(target).getTime();
    const update = ()=> {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((targetDate - now)/1000));
      setSecs(remaining);
      if(remaining === 0 && typeof onZero === 'function') onZero();
    };
    update();
    const id = setInterval(update, 1000);
    return ()=>clearInterval(id);
  },[target, onZero]);

  const mm = String(Math.floor(secs/60)).padStart(2,'0');
  const ss = String(secs%60).padStart(2,'0');
  return <div className="timer text-xl font-bold">{mm}:{ss}</div>;
}

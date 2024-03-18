import React, { useState, useEffect } from 'react';

const LinearCountdown = () => {
    const [count, setCount] = useState(30);
    const duration = 30; 
    const intervalTime = 700; 
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 0) {
            return prevCount - 1;
          }
          clearInterval(interval); 
          return 0;
        });
      }, intervalTime);
  
      return () => clearInterval(interval); 
    }, []); 
  
    return <div>{count}</div>;
  };

export default LinearCountdown;

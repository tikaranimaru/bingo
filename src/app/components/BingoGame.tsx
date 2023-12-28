import { useState, useEffect } from 'react';

const BingoGame = () => {
  const [number, setNumber] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(() => {
        setNumber(Math.floor(Math.random() * 75) + 1);
      }, 100);
    }
  
    return () => window.clearInterval(interval);
  }, [isRunning]);
  
  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div>
      <h1>ビンゴゲーム</h1>
      <div>Number: {number}</div>
      <button onClick={handleStartStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default BingoGame;

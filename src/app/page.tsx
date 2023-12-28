"use client"

import { useState, useEffect } from 'react';

type BingoNumber = {
  index: number;
  isDone: boolean;
};
const BINGO_NUMBERS = [...Array(75)].map((_, i) => ({ index: i+1, isDone: false }));

export default function Home() {


  const [number, setNumber] = useState<number>(0);
  const [luLength, setLuLength] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const [isEditMode, setIsEditMode] = useState(false);

  // localStorage から状態を読み込む関数
  const loadInitialState = () => {
    if (typeof window !== 'undefined') {
      const savedNumbers = localStorage.getItem("bingoNumbers");
      return savedNumbers ? JSON.parse(savedNumbers) : BINGO_NUMBERS;
    } else {
      return BINGO_NUMBERS;
    }
  };
  const [allNumbers, setAllNumbers] = useState<BingoNumber[]>(loadInitialState());
  
  // 編集モードの切り替え
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // isDone の切り替え
  const toggleNumberDone = (index: number) => {
    setAllNumbers(allNumbers.map((n) => {
      if (n.index === index) {
        return { ...n, isDone: !n.isDone };
      }
      return n;
    }));
  };

  const incrementLu = () => {
    if (luLength < 50) {
      setLuLength((prevCount) => prevCount + 1);
    }
  };
  
  useEffect(() => {
    // 状態が変わるたびに localStorage に保存
    localStorage.setItem("bingoNumbers", JSON.stringify(allNumbers));
  }, [allNumbers]);


  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(() => {
        const notDoneList = allNumbers.filter((n) => !n.isDone);
        const number = notDoneList[Math.floor(Math.random() * notDoneList.length)]

        setNumber(number.index);
        incrementLu();
        
      }, 80);
    }
  
    return () => window.clearInterval(interval);
  }, [isRunning]);
  
  const handleStartStop = () => {
    setIsRunning(!isRunning);
    setAllNumbers(allNumbers.map((n) => {
      if (n.index === number) {
        return { ...n, isDone: true };
      }
      return n;
    }));

    if(isRunning) {
      setLuLength(0);
    }

  };

  const resetGame = () => {
    setAllNumbers(BINGO_NUMBERS);
    setNumber(0);
    setIsRunning(false);
    setLuLength(0);
    localStorage.removeItem("bingoNumbers"); // localStorageから状態を削除
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="col col-1">
            <h1 className="text-3xl font-bold text-left">KitchenCamp BINGO<small> @2024納会</small></h1>
          </div>
          <div className="col col-1 text-right">
            <button className="btn btn-sm btn-accent me-2" onClick={toggleEditMode}>
              {isEditMode ? 'Finish Editing' : 'Edit Mode'}
            </button>
            <button className="btn btn-sm btn-error" onClick={resetGame}>
              Reset Game
            </button>
          </div>
        </div>

        <div className="divider my-2"></div>

        <div className="text-center">
          <div className="py-2 my-0 text-[120px] text-center">{number}</div>
          {isRunning ?
            <div>
              <p className='text-base md:text-xl mb-3 h-16'>ドゥ{'ル'.repeat(luLength)} </p>
              <button className="btn btn-lg btn-accent text-white" onClick={handleStartStop}>
                STOP
              </button>
            </div> :
            <div>
              <p className='text-6xl mb-3 h-16'>ドゥンッ!!</p>
              <button className="btn btn-lg btn-neutral" onClick={handleStartStop}>
                START
              </button>
            </div>
          }
        </div>


        <div className="divider"></div>

        <div>
          <div className="grid grid-cols-10 gap-2">
            {allNumbers.map((n) => (
              <div className="col-1 text-base md:text-2xl lg:text-4xl cursor-pointer" key={n.index} onClick={() => isEditMode && toggleNumberDone(n.index)}>
                { n.isDone ?
                  <div className="text-center p-2 md:p-4 lg:p-6 bg-secondary text-white rounded-xl"><p className="font-bold">{n.index}</p></div>
                  :
                  <div className="text-center p-2 md:p-4 lg:p-6 rounded-xl"><p>{n.index}</p></div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
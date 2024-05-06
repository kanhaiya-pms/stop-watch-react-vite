import React, { useState, useRef } from 'react';

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  const startStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - elapsedTime;
      console.log(Date.now());
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10); // Update every 10 milliseconds (0.01 seconds) for microseconds
    }
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
  const totalMilliseconds = Math.floor(time);
  const milliseconds = (totalMilliseconds % 1000).toString().padStart(3, '0');
  const seconds = Math.floor(totalMilliseconds / 1000) % 60;
  const minutes = Math.floor(totalMilliseconds / 60000) % 60;
  const hours = Math.floor(totalMilliseconds / 3600000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
};


  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-amber-400">
        <div className="h-[300px] w-[500px] bg-white rounded-md shadow-lg">

          <div>
            <div className='text-3xl font-bold text-center flex flex-col gap-5 mt-5'>
              <h1>Stop-watch</h1>
              <h1 >{formatTime(elapsedTime)}</h1>
            </div>
            <div className='text-center mt-10'>
              <button
                className="py-1 px-3 bg-blue-700 text-xl rounded text-white shadow  hover:bg-blue-900"
                onClick={startStopwatch}>{isRunning ? 'Stop' : 'Start'}</button>

              <button
                className="ml-5 py-1 px-3 bg-blue-700 text-xl rounded text-white shadow  hover:bg-blue-900"
                onClick={resetStopwatch}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

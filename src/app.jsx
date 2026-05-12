import { useEffect, useRef, useState } from "react";

function App() {
  const focusTime = 25 * 60;
  const shortBreak = 5 * 60;
  const longBreak = 15 * 60;

  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Focus Time");
  const [sessions, setSessions] = useState(0);

  const timerRef = useRef(null);

  // Format Time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  // Start Timer
  const startTimer = () => {
    if (isRunning) return;

    setIsRunning(true);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {

        if (prev === 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);

          alert("Time is up!");

          if (mode === "Focus Time") {
            setSessions((prev) => prev + 1);
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  // Pause Timer
  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  // Reset Timer
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);

    if (mode === "Focus Time") {
      setTimeLeft(focusTime);
    }

    if (mode === "Short Break") {
      setTimeLeft(shortBreak);
    }

    if (mode === "Long Break") {
      setTimeLeft(longBreak);
    }
  };

  // Change Mode
  const changeMode = (newMode) => {
    clearInterval(timerRef.current);
    setIsRunning(false);

    setMode(newMode);

    if (newMode === "Focus Time") {
      setTimeLeft(focusTime);
    }

    if (newMode === "Short Break") {
      setTimeLeft(shortBreak);
    }

    if (newMode === "Long Break") {
      setTimeLeft(longBreak);
    }
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="main-container">

      <h1 className="title">
        Pomodoro Timer
      </h1>

      <div className="status-box">
        {mode}
      </div>

      <h2 className="timer">
        {formatTime(timeLeft)}
      </h2>

      <div className="button-group">

        <button
          className="start-btn"
          onClick={startTimer}
        >
          Start
        </button>

        <button
          className="pause-btn"
          onClick={pauseTimer}
        >
          Pause
        </button>

        <button
          className="reset-btn"
          onClick={resetTimer}
        >
          Reset
        </button>

      </div>

      <div className="mode-group">

        <button
          className="mode-btn"
          onClick={() => changeMode("Focus Time")}
        >
          Focus Time
        </button>

        <button
          className="mode-btn"
          onClick={() => changeMode("Short Break")}
        >
          Short Break
        </button>

        <button
          className="mode-btn"
          onClick={() => changeMode("Long Break")}
        >
          Long Break
        </button>

      </div>

      <p className="session-text">
        Number of focus sessions completed : {sessions}
      </p>

    </div>
  );
}

export default App;
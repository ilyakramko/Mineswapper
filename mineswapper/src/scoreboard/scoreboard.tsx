import { useState } from "react";
import { GameStatus } from "../models/game";
import "./scoreboard.css";

interface ScoreboardProps {
  score: number;
  defaultScore: number;
  gameStatus: GameStatus;
  onResetScore: (score: number) => void;
  onGameStatusUpdate: (status: GameStatus) => void;
}

//TODO: ??
//Is it ok to keep it there?
let stopwatchInterval: any;
let startTime: number;

export default function Scoreboard({
  score,
  defaultScore,
  gameStatus,
  onResetScore,
  onGameStatusUpdate,
}: ScoreboardProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  const startStopwatch = () => {
    if (!stopwatchInterval) {
      startTime = new Date().getTime();
      stopwatchInterval = setInterval(updateStopwatch, 1000);
    }
  };

  const stopStopwatch = () => {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  };

  const updateStopwatch = () => {
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;
    let seconds = Math.floor(elapsedTime / 1000);
    setElapsedTime(seconds);
  };

  if (gameStatus === GameStatus.InProgress) {
    startStopwatch();
  } else {
    stopStopwatch();
  }

  return (
    <div className="top">
      <div className="info">
        <div className="score-text">Score: </div>
        <div id="score" className="score">
          {score}
        </div>
        <div className="stopwatch-text">Time: </div>
        <div id="stopwatch" className="stopwatch">
          {elapsedTime}
        </div>
      </div>
      <div className="controls">
        <button
          id="reset"
          className="reset"
          onClick={() => {
            //Is it ok to call three!!! hooks?
            setElapsedTime(0);
            onResetScore(defaultScore);
            onGameStatusUpdate(GameStatus.NotStarted);
          }}
        >
          <i className="fa-solid fa-rotate"></i>
        </button>
      </div>
    </div>
  );
}

import { GameStatus } from "../models/game";
import "./scoreboard.css";

interface ScoreboardProps {
  score: number;
  defaultScore: number;
  onResetScore: (score: number) => void;
  onGameStatusUpdate: (status: GameStatus) => void;
}

export default function Scoreboard({
  score,
  defaultScore,
  onResetScore,
  onGameStatusUpdate,
}: ScoreboardProps) {
  return (
    <div className="top">
      <div className="info">
        <div className="score-text">Score: </div>
        <div id="score" className="score">
          {score}
        </div>
        <div className="stopwatch-text">Time: </div>
        <div id="stopwatch" className="stopwatch"></div>
      </div>
      <div className="controls">
        <button
          id="reset"
          className="reset"
          onClick={() => {
            //Is it ok to call two hooks?
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

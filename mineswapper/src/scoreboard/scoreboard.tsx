import { GameStatus } from "../models/game";
import "./scoreboard.css";

interface ScoreboardProps {
  onGameStatusUpdate: (status: GameStatus) => void;
}

export default function Scoreboard({ onGameStatusUpdate }: ScoreboardProps) {
  return (
    <div className="top">
      <div className="info">
        <div className="score-text">Score: </div>
        <div id="score" className="score"></div>
        <div className="stopwatch-text">Time: </div>
        <div id="stopwatch" className="stopwatch"></div>
      </div>
      <div className="controls">
        <button
          id="reset"
          className="reset"
          onClick={() => onGameStatusUpdate(GameStatus.NotStarted)}
        >
          <i className="fa-solid fa-rotate"></i>
        </button>
      </div>
    </div>
  );
}

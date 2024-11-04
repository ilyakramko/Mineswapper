import "./scoreboard.css";

export default function Scoreboard() {
  return (
    <div className="top">
      <div className="info">
        <div className="score-text">Score: </div>
        <div id="score" className="score"></div>
        <div className="stopwatch-text">Time: </div>
        <div id="stopwatch" className="stopwatch"></div>
      </div>
      <div className="controls">
        <div id="reset" className="reset">
          <i className="fa-solid fa-rotate"></i>
        </div>
      </div>
    </div>
  );
}

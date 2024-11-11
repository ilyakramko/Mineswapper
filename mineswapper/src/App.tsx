import "./App.css";
import Scoreboard from "./scoreboard/scoreboard";
import Grid from "./grid/grid";
import { GameCell } from "./models/cell";
import { useState } from "react";
import { GameStatus } from "./models/game";
import { generateGrid } from "./utils/utils";

const bombsAmount = 10;
const gridWidth = 10;

let cellArray: GameCell[][] = [];

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.NotStarted
  );
  const [score, setScore] = useState<number>(bombsAmount);

  if (gameStatus === GameStatus.NotStarted) {
    cellArray = generateGrid(gridWidth);
  }

  return (
    <div className="mineswapper">
      <Scoreboard
        score={score}
        defaultScore={bombsAmount}
        onResetScore={setScore}
        onGameStatusUpdate={setGameStatus}
      />
      <Grid
        initGrid={cellArray}
        gridWidth={gridWidth}
        gameStatus={gameStatus}
        bombCount={bombsAmount}
        score={score}
        onSetScore={setScore}
        onGameStatusUpdate={setGameStatus}
      />
    </div>
  );
}

export default App;

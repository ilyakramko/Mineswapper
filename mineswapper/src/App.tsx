import "./App.css";
import Scoreboard from "./scoreboard/scoreboard";
import Grid from "./grid/grid";
import { CellStatus, GameCell } from "./models/cell";
import { useState } from "react";
import { GameStatus } from "./models/game";

const bombsAmount = 10;
const gridWidth = 10;

let cellArray: GameCell[][] = [];

function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.NotStarted
  );
  const [score, setScore] = useState<number>(bombsAmount);

  if (gameStatus === GameStatus.NotStarted) {
    cellArray = generateGrid();
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
        score={score}
        onSetScore={setScore}
        onGameStatusUpdate={setGameStatus}
      />
    </div>
  );
}

function generateGrid(): GameCell[][] {
  const gridArray = Array.from({ length: gridWidth * gridWidth }, (_, i) =>
    i < 10 ? 1 : 0
  ).sort(() => Math.random() - 0.5);

  return setCellScore(toGridCellArray(gridArray, gridWidth));
}

function toGridCellArray(arr: number[], gridWidth: number): GameCell[][] {
  let result: GameCell[][] = [];

  for (let i = 0; i < gridWidth; i++) {
    result.push([]);

    for (let j = 0; j < gridWidth; j++) {
      let gridArrayIndex: number = i * 10 + j;

      let cell: GameCell = {
        status: CellStatus.Closed,
        coordinates: { x: i, y: j },
        isBomb: Boolean(arr[gridArrayIndex]),
        score: 0,
      };

      result[i].push(cell);
    }
  }

  return result;
}

function setCellScore(arr: GameCell[][]): GameCell[][] {
  arr.forEach((_, rowIndex, row) => {
    row.forEach((_, columnIndex) => {
      let bombCount: number = 0;

      for (let m = rowIndex - 1; m <= rowIndex + 1; m++) {
        for (let n = columnIndex - 1; n <= columnIndex + 1; n++) {
          if (
            m < 0 ||
            n < 0 ||
            m >= gridWidth ||
            n >= gridWidth ||
            (m === rowIndex && n === columnIndex)
          )
            continue;

          if (arr[m][n].isBomb) bombCount++;
        }
      }

      arr[rowIndex][columnIndex].score = bombCount;
    });
  });

  return arr;
}

export default App;

import Cell from "./cell/cell";
import { GameCell, CellStatus, Coordinates } from "../models/cell";
import "./grid.css";
import { useEffect, useState } from "react";
import { GameStatus } from "../models/game";

const indexes = Array.from({ length: 10 }, (_, i) => i);

interface GridProps {
  initGrid: GameCell[][];
  gridWidth: number;
  gameStatus: GameStatus;
  score: number;
  onSetScore: (score: number) => void;
  onGameStatusUpdate: (status: GameStatus) => void;
}

//If from parent and creating the useState on it, is it ok?
//Too much?
export default function Grid({
  initGrid,
  gridWidth,
  gameStatus,
  score,
  onSetScore,
  onGameStatusUpdate,
}: GridProps) {
  const [cellArray, setCellArray] = useState<GameCell[][]>(initGrid);

  //Was added if initGrid updated since useState is setted only during initial rendering
  //??
  //useReducer instead?
  useEffect(() => {
    setCellArray(initGrid);
  }, [initGrid]);

  const handleClick = (
    coord: Coordinates,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    switch (event.button) {
      case 0:
        handleLeftClick(coord);
        break;
      //TODO: Right click is not working;
      case 1:
        handleRightClick(coord);
        break;
      default:
        break;
    }
  };

  const handleLeftClick = (coord: Coordinates) => {
    let arrayCopy: GameCell[][] = cellArray.slice();
    clickCell(coord, arrayCopy);
    setCellArray(arrayCopy);
  };

  const handleRightClick = (coord: Coordinates) => {
    if (gameStatus === GameStatus.GameOver) return;

    let arr: GameCell[][] = cellArray.slice();
    let scoreCopy: number = score;

    if (gameStatus === GameStatus.NotStarted) {
      onGameStatusUpdate(GameStatus.InProgress);
    }

    let cell: GameCell = arr[coord.x][coord.y];
    if (cell.status === CellStatus.Flagged) {
      cell.status = CellStatus.Closed;
      onSetScore(++scoreCopy);
      setCellArray(arr);
      return;
    }

    if (score === 0) return;

    if (cell.status === CellStatus.Closed) {
      cell.status = CellStatus.Flagged;
      onSetScore(--scoreCopy);
      setCellArray(arr);
      return;
    }
  };

  const clickCell = (coord: Coordinates, arr: GameCell[][]) => {
    if (gameStatus === GameStatus.GameOver) return;

    if (gameStatus === GameStatus.NotStarted) {
      onGameStatusUpdate(GameStatus.InProgress);
    }

    let cell: GameCell = arr[coord.x][coord.y];

    if (
      cell.status === CellStatus.Flagged ||
      cell.status === CellStatus.Opened
    ) {
      return;
    }

    cell.status = CellStatus.Opened;

    if (cell.isBomb) {
      onGameStatusUpdate(GameStatus.GameOver);
      return;
    }

    if (cell.score > 0) {
      checkForWin(arr);
      return;
    }

    for (let m = coord.x - 1; m <= coord.x + 1; m++) {
      for (let n = coord.y - 1; n <= coord.y + 1; n++) {
        let cellCoord: Coordinates = { x: m, y: n };

        if (
          m < 0 ||
          n < 0 ||
          m >= gridWidth ||
          n >= gridWidth ||
          (m === coord.x && n === coord.y)
        )
          continue;

        clickCell(cellCoord, arr);
      }
    }

    checkForWin(arr);
  };

  //Too bad :)
  const checkForWin = (arr: GameCell[][]) => {
    if (gameStatus === GameStatus.GameOver) return;

    let oppenedCells: number = 0;

    for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridWidth; j++) {
        if (!arr[i][j].isBomb && arr[i][j].status === CellStatus.Opened) {
          oppenedCells++;
        }
      }
    }

    //10 is bomb count(awful)
    if (oppenedCells === gridWidth * gridWidth - 10) {
      onGameStatusUpdate(GameStatus.Win);
    }
  };

  const rows = indexes.map((_, rowIndex) => {
    return (
      <div key={rowIndex} className="grid-row">
        {indexes.map((_, columnIndex) => {
          return (
            <Cell
              key={columnIndex}
              onCellClick={handleClick}
              cell={cellArray[rowIndex][columnIndex]}
              gameStatus={gameStatus}
            />
          );
        })}
      </div>
    );
  });

  return (
    <div id="mineswapper-grid" className="grid">
      {(gameStatus === GameStatus.Win ||
        gameStatus === GameStatus.GameOver) && (
        <div
          className={
            gameStatus === GameStatus.Win
              ? "result result-win"
              : "result result-fail"
          }
        >
          {gameStatus === GameStatus.Win ? "Win" : "Game Over"}
        </div>
      )}
      {rows}
    </div>
  );
}

import Cell from "./cell/cell";
import { GameCell, CellStatus, Coordinates } from "../../models/cell";
import "./grid.css";
import { useEffect, useState } from "react";
import { GameStatus } from "../../models/game";

const indexes = Array.from({ length: 10 }, (_, i) => i);
//To avoid itterating over array
let oppenedCellsGlobal: number = 0;
let clicksGlobal: number = 0;

interface GridProps {
  initGrid: GameCell[][];
  gridWidth: number;
  bombCount: number;
  gameStatus: GameStatus;
  score: number;
  onSetScore: (score: number) => void;
  onGameStatusUpdate: (status: GameStatus) => void;
  onSendCurrentGameInfo: (clicks: number, status: GameStatus) => Promise<void>;
}

//If from parent and creating the useState on it, is it ok?
//Too much?
export default function Grid({
  initGrid,
  gridWidth,
  bombCount,
  gameStatus,
  score,
  onSetScore,
  onGameStatusUpdate,
  onSendCurrentGameInfo,
}: GridProps) {
  const [cellArray, setCellArray] = useState<GameCell[][]>(initGrid);

  //Was added if initGrid updated since useState is setted only during initial rendering
  //Should be avoided?
  //Use reducer instead?
  useEffect(() => {
    setCellArray(initGrid);
  }, [initGrid]);

  //Prevent right click on cells
  //depend on initGrid?????
  useEffect(() => {
    function handleContextMenu(e: Event) {
      e.preventDefault();
    }

    const rootElement = document.getElementById("mineswapper-grid");
    if (rootElement === null) return;

    rootElement.addEventListener("contextmenu", handleContextMenu);

    return () => {
      rootElement.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [initGrid]);

  const handleClick = (
    coord: Coordinates,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    switch (event.button) {
      case 0:
        handleLeftClick(coord);
        break;
      case 2:
        handleRightClick(coord);
        break;
      default:
        break;
    }
  };

  const handleLeftClick = (coord: Coordinates) => {
    clicksGlobal++;
    let arrayCopy: GameCell[][] = cellArray.slice();
    clickCell(coord, arrayCopy);
    setCellArray(arrayCopy);
  };

  const handleRightClick = (coord: Coordinates) => {
    if (gameStatus === GameStatus.GameOver) return;

    let arr: GameCell[][] = cellArray.slice();

    if (gameStatus === GameStatus.NotStarted) {
      onGameStatusUpdate(GameStatus.InProgress);
    }

    let cell: GameCell = arr[coord.x][coord.y];
    if (cell.status === CellStatus.Flagged) {
      cell.status = CellStatus.Closed;
      onSetScore(score + 1);
      setCellArray(arr);
      return;
    }

    if (score === 0) return;

    if (cell.status === CellStatus.Closed) {
      cell.status = CellStatus.Flagged;
      onSetScore(score - 1);
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

    openCell(cell);

    if (cell.isBomb) {
      sendCurrentGameInfo(GameStatus.GameOver);
      return;
    }

    if (cell.score > 0) {
      checkForWinWithoutItterating();
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

    checkForWinWithoutItterating();
  };

  const checkForWinWithoutItterating = () => {
    if (gameStatus === GameStatus.GameOver) return;

    if (oppenedCellsGlobal === gridWidth * gridWidth - bombCount) {
      sendCurrentGameInfo(GameStatus.Win);
    }
  };

  const sendCurrentGameInfo = (status: GameStatus) => {
    onSendCurrentGameInfo(clicksGlobal, status);
    onGameStatusUpdate(status);
    oppenedCellsGlobal = 0;
    clicksGlobal = 0;
  };

  const openCell = (cell: GameCell) => {
    if (gameStatus === GameStatus.GameOver) return;
    oppenedCellsGlobal++;
    cell.status = CellStatus.Opened;
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

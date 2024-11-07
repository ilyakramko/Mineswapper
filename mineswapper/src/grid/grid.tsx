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
  onGameStatusUpdate: (status: GameStatus) => void;
}

//If props from parent and creating the useState on it, is it ok?
export default function Grid({
  initGrid,
  gridWidth,
  gameStatus,
  onGameStatusUpdate,
}: GridProps) {
  const [cellArray, setCellArray] = useState<GameCell[][]>(initGrid);

  //Was added if initGrid updated since useState is setted only during initial rendering
  //??
  useEffect(() => {
    setCellArray(initGrid);
  }, [initGrid]);

  function handleLeftClick(coord: Coordinates) {
    let arrayCopy: GameCell[][] = cellArray.slice();
    clickCell(coord, arrayCopy);
    setCellArray(arrayCopy);
  }

  // function handleRightClick(coordinates: Coordinates) {}

  //TODO: still re-render grid on game-over or by click on opened/flagged cell.
  function clickCell(coord: Coordinates, arr: GameCell[][]) {
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
      //TODO: Game Over
      onGameStatusUpdate(GameStatus.GameOver);
      return;
    }

    if (cell.score > 0) {
      //Update the cell array using state?
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
  }

  const rows = indexes.map((_, rowIndex) => {
    return (
      <div key={rowIndex} className="grid-row">
        {indexes.map((_, columnIndex) => {
          return (
            <Cell
              key={columnIndex}
              onCellLeftClick={handleLeftClick}
              cell={cellArray[rowIndex][columnIndex]}
            />
          );
        })}
      </div>
    );
  });

  return (
    <div id="mineswapper-grid" className="grid">
      {rows}
    </div>
  );
}

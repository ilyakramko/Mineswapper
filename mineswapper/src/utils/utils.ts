import { CellStatus, GameCell, scoreColors } from "../models/cell";
import { GameStatus } from "../models/game";

export function generateGrid(gridWidth: number): GameCell[][] {
  const gridArray = Array.from({ length: gridWidth * gridWidth }, (_, i) =>
    i < 10 ? 1 : 0
  ).sort(() => Math.random() - 0.5);

  return setCellScore(toGridCellArray(gridArray, gridWidth), gridWidth);
}

export function toGridCellArray(
  arr: number[],
  gridWidth: number
): GameCell[][] {
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

export function setCellScore(
  arr: GameCell[][],
  gridWidth: number
): GameCell[][] {
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

export function getCellStyles(cell: GameCell, gameStatus: GameStatus): string {
  let statusClassName: string = "";

  switch (cell.status) {
    case CellStatus.Opened:
      if (cell.isBomb) {
        statusClassName = "cell-mine";
        break;
      }

      statusClassName =
        cell.score === 0
          ? "cell-empty"
          : `cell-opened ${scoreColors[cell.score - 1]}`;
      break;
    case CellStatus.Flagged:
      statusClassName = "cell-flag";

      if (gameStatus === GameStatus.GameOver && cell.isBomb) {
        statusClassName += " cell-flag-bomb";
      }

      break;
    case CellStatus.Closed:
      if (gameStatus === GameStatus.GameOver && cell.isBomb) {
        statusClassName = "cell-mine";
        break;
      }
      break;
    default:
      break;
  }

  return statusClassName;
}

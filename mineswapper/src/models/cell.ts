import { GameStatus } from "./game";

export enum CellStatus {
  Closed,
  Opened,
  Flagged,
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface GameCell {
  status: CellStatus;
  coordinates: Coordinates;
  isBomb: boolean;
  score: number;
}

export const scoreColors = [
  "cell-one",
  "cell-two",
  "cell-three",
  "cell-four",
  "cell-five",
];

export const getCellStyles = (
  cell: GameCell,
  gameStatus: GameStatus
): string => {
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
};

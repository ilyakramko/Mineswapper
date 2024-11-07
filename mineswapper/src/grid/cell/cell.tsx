import { CellStatus, Coordinates, GameCell } from "../../models/cell";
import "./cell.css";

interface CellProps {
  cell: GameCell;
  onCellLeftClick: (coordinates: Coordinates) => void;
}

export default function Cell({ cell, onCellLeftClick }: CellProps) {
  let statusClassName: string = "";
  let statusContent: string = "";

  switch (cell.status) {
    case CellStatus.Opened:
      if (cell.isBomb) {
        statusClassName = "cell-mine";
        break;
      }

      if (cell.score === 0) {
        statusClassName = "cell-empty";
      } else {
        statusClassName = "cell-opened";
        statusContent = String(cell.score);

        switch (cell.score) {
          case 1:
            statusClassName += " cell-one";
            break;
          case 2:
            statusClassName += " cell-two";
            break;
          case 3:
            statusClassName += " cell-three";
            break;
          case 4:
            statusClassName += " cell-four";
            break;
          case 5:
            statusClassName += " cell-five";
            break;
        }
      }
      break;
    case CellStatus.Flagged:
      statusClassName = "cell-flag";

      //if win or gameover
      // if (cell.isBomb) {
      //   statusClassName += " cell-flag-bomb";
      // }

      break;
    default:
      break;
  }

  return (
    <button
      className={`cell ${statusClassName}`}
      onClick={() => onCellLeftClick(cell.coordinates)}
    >
      {cell.status === CellStatus.Flagged ? (
        <i className="fa-solid fa-flag"></i>
      ) : cell.status === CellStatus.Opened && cell.isBomb ? (
        <i className="fa-solid fa-bomb"></i>
      ) : (
        statusContent
      )}
    </button>
  );
}

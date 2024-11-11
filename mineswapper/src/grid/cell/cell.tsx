import { CellStatus, Coordinates, GameCell } from "../../models/cell";
import { GameStatus } from "../../models/game";
import { getCellStyles } from "../../utils/utils";
import "./cell.css";

interface CellProps {
  cell: GameCell;
  gameStatus: GameStatus;
  onCellClick: (
    coordinates: Coordinates,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export default function Cell({ cell, gameStatus, onCellClick }: CellProps) {
  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCellClick(cell.coordinates, e);
  };

  //In case to avoid re-render check the status on click
  //Is undefined good choice????
  //It will not re-render now but overall?
  return (
    <button
      className={`cell ${getCellStyles(cell, gameStatus)}`}
      // onClick={() =>
      //   cell.status === CellStatus.Closed ? handleClick : undefined
      // }
      onMouseUp={(e) => {
        handleMouseUp(e);
      }}
    >
      {cell.status === CellStatus.Flagged ? (
        <i className="fa-solid fa-flag"></i>
      ) : cell.isBomb &&
        (cell.status === CellStatus.Opened ||
          gameStatus === GameStatus.GameOver) ? (
        <i className="fa-solid fa-bomb"></i>
      ) : (
        cell.status === CellStatus.Opened &&
        cell.score > 0 &&
        String(cell.score)
      )}
    </button>
  );
}

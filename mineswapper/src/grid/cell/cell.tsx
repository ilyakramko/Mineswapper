import { GameCell } from "../../models/cell";
import "./cell.css";

interface CellProps {
  cell: GameCell;
}

export default function Cell({ cell }: CellProps) {
  return <div className="cell">{cell.isBomb ? "B" : "C"}</div>;
}

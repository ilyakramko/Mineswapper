import Cell from "./cell/cell";
import { GameCell, CellStatus } from "../models/cell";
import "./grid.css";

export default function Grid() {
  //TODO: Move this once game complexity introduced
  const bombsAmount = 10;
  const gridWidth = 10;

  const indexes = Array.from({ length: 10 }, (_, i) => i);

  const gridArray = Array.from({ length: gridWidth * gridWidth }, (_, i) =>
    i < 10 ? 1 : 0
  ).sort(() => Math.random() - 0.5);

  var cellArray = toGridCellArray(gridArray, gridWidth);

  const rows = indexes.map((_, rowIndex) => {
    return (
      <div key={rowIndex} className="grid-row">
        {indexes.map((_, columnIndex) => {
          return (
            <Cell key={columnIndex} cell={cellArray[rowIndex][columnIndex]} />
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
      };

      result[i].push(cell);
    }
  }

  return result;
}

import Cell from "./cell/cell";
import "./grid.css";

export default function Grid() {
  const indexes = Array.from({ length: 10 }, (_, i) => i);

  const rows = indexes.map((_, rowIndex) => {
    return (
      <div key={rowIndex} className="grid-row">
        {indexes.map((_, columnsIndex) => {
          return <Cell key={columnsIndex} />;
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

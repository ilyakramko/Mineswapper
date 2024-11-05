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
}

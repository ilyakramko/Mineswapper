export enum GameStatus {
  NotStarted,
  InProgress,
  Win,
  GameOver,
}

export interface GameInfoRequest {
  elapsedTime: number;
  clicks: number;
  cellsFlagged: number;
  isWin: boolean;
}

export interface GameInfoResponse {
  id: string;
  elapsedTime: number;
  clicks: number;
  cellsFlagged: number;
  isWin: boolean;
  score: number;
  played: Date;
}

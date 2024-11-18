import { GameInfoRequest, GameInfoResponse } from "../models/game";
import { Player } from "../models/player";
import { call } from "./httpService";

export async function currentPlayer(): Promise<Player> {
  var response = await call<null, Player>("GET", "user/current");

  if (response === null) {
    throw new Error("Response is null");
  }

  return response;
}

export async function pushGameInfo(
  elapsedTime: number,
  clicks: number,
  cellsFlagged: number,
  isWin: boolean
): Promise<GameInfoResponse> {
  const request = {
    elapsedTime: elapsedTime,
    clicks: clicks,
    cellsFlagged: cellsFlagged,
    isWin: isWin,
  };

  var response = await call<GameInfoRequest, GameInfoResponse>(
    "POST",
    "game",
    request
  );

  if (response === null) {
    throw new Error("Response is null");
  }

  return response;
}

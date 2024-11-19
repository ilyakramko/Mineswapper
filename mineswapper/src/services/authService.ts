import { AuthRequest, AuthResponse } from "../models/auth";
import { call } from "./httpService";

export async function authPlayer(username: string): Promise<AuthResponse> {
  const authRequest = {
    username: username,
  };

  var response = await call<AuthRequest, AuthResponse>(
    "POST",
    "auth/token",
    authRequest,
    false
  );

  if (response === null) {
    throw new Error("Response is null");
  }

  return response;
}
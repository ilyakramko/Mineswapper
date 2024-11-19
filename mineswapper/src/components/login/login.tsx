import "./login.css";
import { useState } from "react";
import { authPlayer } from "../../services/authService";
import { currentPlayer } from "../../services/gameService";
import { Player } from "../../models/player";

interface LoginProps {
  onAuth: (player: Player) => void;
}

export default function Login({ onAuth }: LoginProps) {
  const [username, setUsername] = useState("");

  const onAuthPlayer = async () => {
    try {
      const authResponse = await authPlayer(username);
      localStorage.setItem("token", authResponse.accessToken);

      const player = await currentPlayer();

      onAuth(player);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="username-box">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="username-input">
          <input
            type="textbox"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="username-submit">
          <input type="submit" value="Login" onClick={onAuthPlayer}></input>
        </div>
      </form>
    </div>
  );
}

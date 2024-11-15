import "./login.css";
import { AuthResponse } from "../../models/auth";
import { useState } from "react";

interface LoginProps {
  onAuth: (isAuth: boolean) => void;
}

//TODO: On new click the user info is not updated
export default function Login({ onAuth }: LoginProps) {
  const [username, setUsername] = useState("");
  //TODO: temp, should be moved to service or smth
  //storing and retrivieng token???
  const authPlayer = async () => {
    try {
      const authRequest = {
        username: username,
      };

      const response = await fetch(
        "https://mineswapper-api.azurewebsites.net/api/auth/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authRequest),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = (await response.json()) as AuthResponse;

      if (data.accessToken && data.accessToken !== "") {
        localStorage.setItem("token", data.accessToken);
        onAuth(true);
      }
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
          <input type="submit" value="Login" onClick={authPlayer}></input>
        </div>
      </form>
    </div>
  );
}

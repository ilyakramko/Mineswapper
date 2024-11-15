import { useEffect, useState } from "react";
import { Player } from "../../models/player";
import "./playerInfo.css";

export default function PlayerInfo() {
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    //TODO: temp, should be moved to service or smth
    //storing and retrivieng token???
    fetch("https://mineswapper-api.azurewebsites.net/api/user/current", {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setPlayer(data as Player);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="player-info">
      <div className="player-info-item">
        <div>Username: </div>
        <div>
          <b>{player && player.userName}</b>
        </div>
      </div>
      <div className="player-info-item">
        <div>Games: </div>
        <div>
          <b>{player && player.gamesPlayed}</b>
        </div>
      </div>
      <div className="player-info-item">
        <div>Total score: </div>
        <div>
          <b>{player && player.totalScore}</b>
        </div>
      </div>
      <div className="player-info-item">
        <div>Rating: </div>
        <div>
          <b>
            {player && player.gamesPlayed > 0
              ? Math.round(player.totalScore / player.gamesPlayed)
              : 0}
          </b>
        </div>
      </div>
      {/* Add openning the stat of the games played in modal */}
    </div>
  );
}

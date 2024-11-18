import { Player } from "../../models/player";
import "./playerInfo.css";

interface PlayerInfoProps {
  player: Player;
  onLogout: (isAuth: boolean) => void;
}

export default function PlayerInfo({ player, onLogout }: PlayerInfoProps) {
  const onLogOut = () => {
    localStorage.removeItem("token");
    onLogout(false);
  };

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
      <div className="player-info-logout">
        <div className="player-info-logout-button">
          <button onClick={onLogOut}>Logout</button>
        </div>
      </div>
      {/* Add openning the stat of the games played in modal */}
    </div>
  );
}

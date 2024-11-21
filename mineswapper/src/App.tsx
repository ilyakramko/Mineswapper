import "./App.css";
import Scoreboard from "./components/scoreboard/scoreboard";
import Grid from "./components/grid/grid";
import { GameCell } from "./models/cell";
import { useRef, useState } from "react";
import { GameStatus } from "./models/game";
import { generateGrid } from "./utils/utils";
import Login from "./components/login/login";
import PlayerInfo from "./components/player-info/playerInfo";
import { Player } from "./models/player";
import { pushGameInfo } from "./services/gameService";

const bombsAmount = 10;
const gridWidth = 10;

//TODO: should move all out of App.tsx?
function App() {
  //TODO: user context for score, player and gameStatus?
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.NotStarted
  );
  const [score, setScore] = useState<number>(bombsAmount);
  const [player, setPlayer] = useState<Player | undefined>(undefined);

  const gameElapsedTime = useRef<number>(0);

  const logoutPlayer = () => {
    setPlayer(undefined);
    setScore(0);
    setGameStatus(GameStatus.NotStarted);
  };

  const stopwatchUpdate = (time: number) => {
    gameElapsedTime.current = time;
  };

  const sendCurrentGameInfo = async (clicks: number, status: GameStatus) => {
    if (player === undefined) {
      throw new Error("Player is not authenticated.");
    }

    const gameInfo = await pushGameInfo(
      gameElapsedTime.current === 0 ? 1 : gameElapsedTime.current,
      clicks,
      bombsAmount - score,
      status === GameStatus.Win
    );

    gameElapsedTime.current = 0;

    setPlayer({
      ...player,
      totalScore: player.totalScore + gameInfo.score,
      gamesPlayed: player.gamesPlayed + 1,
    });
  };

  return (
    <div className="container">
      {!player && (
        <div className="login">
          <Login onAuth={setPlayer} />
        </div>
      )}

      {player && (
        <div className="player">
          <PlayerInfo player={player} onLogout={logoutPlayer} />
        </div>
      )}

      {player && (
        <div className="mineswapper">
          <Scoreboard
            score={score}
            defaultScore={bombsAmount}
            gameStatus={gameStatus}
            onStopwatchUpdate={stopwatchUpdate}
            onResetScore={setScore}
            onGameStatusUpdate={setGameStatus}
          />
          <Grid
            gridWidth={gridWidth}
            gameStatus={gameStatus}
            bombCount={bombsAmount}
            score={score}
            onSetScore={setScore}
            onGameStatusUpdate={setGameStatus}
            onSendCurrentGameInfo={sendCurrentGameInfo}
          />
        </div>
      )}
    </div>
  );
}

export default App;

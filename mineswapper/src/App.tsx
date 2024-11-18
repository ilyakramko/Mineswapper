import "./App.css";
import Scoreboard from "./components/scoreboard/scoreboard";
import Grid from "./components/grid/grid";
import { GameCell } from "./models/cell";
import { useEffect, useState } from "react";
import { GameStatus } from "./models/game";
import { generateGrid } from "./utils/utils";
import Login from "./components/login/login";
import PlayerInfo from "./components/player-info/playerInfo";
import { Player } from "./models/player";

const defaultPlayer: Player = {
  userName: "",
  gamesPlayed: 0,
  totalScore: 0,
};

const bombsAmount = 10;
const gridWidth = 10;

let cellArray: GameCell[][] = [];

//TODO: should move all out of App.tsx?
function App() {
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.NotStarted
  );
  const [score, setScore] = useState<number>(bombsAmount);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [player, setPlayer] = useState<Player>(defaultPlayer);

  if (gameStatus === GameStatus.NotStarted) {
    //TODO: should be on the grid level
    cellArray = generateGrid(gridWidth);
  }

  //Prevent right click on cells
  useEffect(() => {
    function handleContextMenu(e: Event) {
      e.preventDefault();
    }

    const rootElement = document.getElementById("mineswapper-grid");
    if (rootElement === null) return;

    rootElement.addEventListener("contextmenu", handleContextMenu);

    return () => {
      rootElement.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div className="container">
      {!authenticated && (
        <div className="login">
          <Login setPlayer={setPlayer} onAuth={setAuthenticated} />
        </div>
      )}

      {authenticated && (
        <div className="player">
          <PlayerInfo player={player} onLogout={setAuthenticated} />
        </div>
      )}

      {authenticated && (
        <div className="mineswapper">
          <Scoreboard
            score={score}
            defaultScore={bombsAmount}
            gameStatus={gameStatus}
            onResetScore={setScore}
            onGameStatusUpdate={setGameStatus}
          />
          <Grid
            initGrid={cellArray}
            gridWidth={gridWidth}
            gameStatus={gameStatus}
            bombCount={bombsAmount}
            score={score}
            onSetScore={setScore}
            onGameStatusUpdate={setGameStatus}
          />
        </div>
      )}
    </div>
  );
}

export default App;

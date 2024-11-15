import "./playerInfo.css";

export default function PlayerInfo() {
  return (
    <div className="player-info">
      <div className="player-info-item">
        <div>Username: </div>
        <div>
          <b>ilya.kremko</b>
        </div>
      </div>
      <div className="player-info-item">
        <div>Games: </div>
        <div>
          <b>10</b>
        </div>
      </div>
      <div className="player-info-item">
        <div>Total score: </div>
        <div>
          <b>25478</b>
        </div>
      </div>
      <div className="player-info-item">
        <div>Rating: </div>
        <div>
          <b>2547</b>
        </div>
      </div>
      {/* TODO:Open in modal */}
      {/* <div className="player-games"></div> */}
    </div>
  );
}

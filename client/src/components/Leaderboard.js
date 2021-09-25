import React, { useContext } from "react";

import HangmanContext from "./HangmanContext";

const Leaderboard = ({ scores }) => {
  const [state] = useContext(HangmanContext);

  console.log("RENDERING Leaderboard.js");

  return (
    <div>
      <div>Leaderboard</div>
      <div>Game status: {state.gameStatus}</div>
      <br />
      {console.log(scores)}
      {scores
        .sort((a, b) => a.errors > b.errors)
        .map((i) => (
          <div>{i.userName + ": " + (100 / (1 + i.errors)).toFixed(2)}</div>
        ))}
    </div>
  );
};

export default Leaderboard;

import React, { useContext } from "react";
import HangmanContext from "./HangmanContext";
import * as utils from "../utils/Utils";

const Score = () => {
  const [state] = useContext(HangmanContext);
  const censored = state.puzzle.split("").map((i) => {
    if (state.enteredLetters.includes(i.toUpperCase()) || !utils.isLetter(i)) {
      return i;
    } else {
      return "*";
    }
  });
  //console.log(censored);
  return (
    <div>
      <p>{"Number of errors: " + state.errNum + "/6"}</p>

      <p>{censored.join("")}</p>
    </div>
  );
};

export default Score;

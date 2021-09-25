import React, { useState, useContext } from "react";
import { getAlphabet } from "../utils/Utils";

import HangmanContext from "./HangmanContext";

const Input = () => {
  const [state, dispatch] = useContext(HangmanContext);
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleSubmit = (e) => {
    alert("You choose the letter: " + selected);
    dispatch({ type: "ENTER_LETTER", letter: selected });
    setSelected("");
    e.preventDefault();
  };

  const handleRestart = () => {
    alert("Do you want to restart the game?");
    dispatch({ type: "RESTART" });
  };

  const alphabet = getAlphabet();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Guess the word:
          <select value={selected} onChange={handleChange} required>
            <option value="" disabled="true"></option>
            {alphabet.map((i) =>
              state.enteredLetters.includes(i) ? null : (
                <option key={i} value={i}>
                  {i}
                </option>
              )
            )}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
};

export default Input;

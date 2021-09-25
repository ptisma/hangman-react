import React, { useReducer } from "react";
import Start from "./Start";
import Game from "./Game";
import HangmanContext from "./HangmanContext";

const initialState = {
  playerName: "",
  errNum: 0,
  corrNum: 0,
  gameStatus: "PLAYING",
  puzzleID: "",
  puzzle: "",
  puzzleCharLen: 0,
  enteredLetters: [],
  duration: 0,
  startTime: 0,
  endTime: 0,
};

//START- Enter name
//PLAYING- Choose letters
// WON- You have won, leaderboard
// LOST- You have lost, leaderboard
const reducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      return { ...state, playerName: action.name };
    case "ADD_PUZZLE":
      return {
        ...state,
        puzzleID: action.ID,
        puzzle: action.puzzle,
        puzzleCharLen: action.length,
        startTime: action.start,
      };
    case "ENTER_LETTER":
      //Move splits to component?
      let newError;
      let count;
      if (state.puzzle.toUpperCase().split("").includes(action.letter)) {
        newError = state.errNum;
        count =
          state.puzzle.toUpperCase().split(action.letter).length -
          1 +
          state.corrNum;
      } else {
        newError = state.errNum + 1;
        count = state.corrNum;
      }

      let gameStatus = state.gameStatus;
      let endTime = state.endTime;
      if (count === state.puzzleCharLen) {
        gameStatus = "WON";
        endTime = new Date().getTime();
      }
      if (newError === 2) {
        gameStatus = "LOST";
      }
      return {
        ...state,
        errNum: newError,
        corrNum: count,
        gameStatus: gameStatus,
        enteredLetters: [...state.enteredLetters, action.letter],
        endTime: endTime,
      };

    case "RESTART":
      return { ...initialState };
    default:
      return state;
  }
};

const Hangman = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HangmanContext.Provider value={[state, dispatch]}>
      {state.playerName ? <Game /> : <Start />}
    </HangmanContext.Provider>
  );
};

export default Hangman;

import axios from "axios";
import React, { useState, useEffect, useContext } from "react";

import * as urls from "../constants/Urls";
import { findUnique } from "../utils/Utils";
import HangmanContext from "./HangmanContext";
import Input from "./Input";
import Leaderboard from "./Leaderboard";
import Score from "./Score";

export const Game = () => {
  const [scores, setScores] = useState([]);
  const [state, dispatch] = useContext(HangmanContext);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      const quote = await axios.get(urls.QUOTE_URL);
      console.log(quote);
      dispatch({
        type: "ADD_PUZZLE",
        puzzle: quote.data.content,
        ID: quote.data._id,
        length: quote.data.content.replace(/[^A-Z]/gi, "").length,
        start: new Date().getTime(),
      });
    };
    fetchQuote();
  }, []);

  useEffect(() => {
    const publishScore = async () => {
      console.log("Publishing scores");
      const headers = {
        "Content-Type": "application/json",
      };
      let duration = state.endTime - state.startTime;
      let uniqueCharacters = findUnique(state.puzzle);
      let score = {
        quoteId: state.puzzleID,
        length: state.puzzleCharLen,
        uniqueCharacters: uniqueCharacters,
        userName: state.playerName,
        errors: state.errNum,
        duration: duration,
      };
      let res = await axios.post(urls.POST_URL, score, { headers });
      setWaiting(false);
    };
    if (state.gameStatus === "WON") {
      publishScore();
    } else if (state.gameStatus === "LOST") {
      setWaiting(false);
    }
  }, [state]);

  useEffect(() => {
    if (waiting === false) {
      console.log("Fetching scores");
      const fetchScores = async () => {
        const scores = await axios.get(urls.GET_URL);

        setScores(scores.data);
      };
      fetchScores();
    }
  }, [waiting]);

  //console.log("RENDERING Game.js");

  return (
    <div>
      {state.gameStatus === "PLAYING" ? (
        <div>
          <Score /> <Input />
        </div>
      ) : (
        <Leaderboard scores={scores} />
      )}
    </div>
  );
};

export default Game;

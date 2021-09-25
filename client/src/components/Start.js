import React, { useState, useContext } from "react";
import HangmanContext from "./HangmanContext";

const Start = () => {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState({});
  const [, dispatch] = useContext(HangmanContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      //console.log("TEST");
      dispatch({ type: "START_GAME", name: name });
      setName("");
      setNameErr({});
    }
  };

  const formValidation = () => {
    const nameErr = {};
    let isValid = true;
    if (name.trim().length < 4) {
      nameErr.nameTooShort = "Name is too short, use atleast 4 characters";
      isValid = false;
    }
    if (name.trim().length > 10) {
      nameErr.nameTooLong = "Name is too long, use max 10 characters";
      isValid = false;
    }
    if (!/^[A-Za-z].*$/.test(name)) {
      nameErr.nameFirstChar = "Name has to start with letter";
      isValid = false;
    }
    if (!/^\S*$/.test(name)) {
      nameErr.nameWhiteSpace = "Name must not contain whitespaces";
      isValid = false;
    }
    setNameErr(nameErr);
    return isValid;
  };
  return (
    <form>
      <input
        type="text"
        placeholder="Enter your name"
        name="gametag"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      {Object.keys(nameErr).map((key) => (
        <div style={{ color: "red" }}>{nameErr[key]}</div>
      ))}
      <button onClick={handleSubmit}>PLAY</button>
    </form>
  );
};

export default Start;

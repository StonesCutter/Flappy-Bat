import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Howl, Howler } from "howler";
import {
  genRankingList,
  genUserData,
  addNewUser,
  uploadUserData,
  getUserData,
  userExistsAlready,
} from "../utils/scoreListUtils";
import { getLocalStorage } from "../utils/localStorageUtils";
import Input from "../components/ui/input/Input";
import GamePhrase from "../components/ui/gamePhrase/GamePhrase";
import Spritesheet from "react-responsive-spritesheet";
import ParallaxBG from "../components/ui/parallaxBG/ParallaxBG";
import click from "../assets/sounds/click.wav";
import bat from "../assets/images/bat.png";
import "../styles/login/login.css";

function Login() {
  const navigate = useNavigate();

  const { Howl, Howler } = require("howler");

  const [state, setState] = useState({
    isNameValid: false,
  });

  let name = "";
  let skin = null;
  let messageToShow = "";
  let allowedToPlay = false;

  let soundClick = new Howl({
    src: [click],
  });

  function readName(e) {
    soundClick.play();
    name = e.target.value;
  }

  function goToHome() {
    console.log("go to home");
    soundClick.play();

    allowedToPlay = addNewUser(name, messageToShow);
    if (allowedToPlay) {
      uploadUserData(name, skin);
      console.log("user Data", getLocalStorage("userData"));
      navigate("/Home");
    }
  }

  useEffect(() => {
    genRankingList();
    genUserData();
    //getUserData(name, skin);
    console.log("generazione dei local storage");
  }, []);

  return (
    <div className="loginMain">
      <ParallaxBG />
      <div className="loginFirst">
        <GamePhrase
          classNameGamePhrase={"titleDefault"}
          h1GamePhrase={"BatBoard"}
        />
        {!state.isNameValid && messageToShow}
        <Spritesheet
          className={"posChar"}
          image={bat}
          widthFrame={500}
          heightFrame={500}
          steps={6}
          fps={8}
          autoplay={true}
          loop={true}
          timeout={true}
        />
        <Input
          cssStyleInput={"defaultText"}
          typeInput={"text"}
          placeholderInput={"Insert Your Name"}
          callbackInput={readName}
        />
        <Input
          cssStyleInput={"defaultButton"}
          typeInput={"button"}
          valueInput={"Login"}
          onClickInput={goToHome}
        />
      </div>
    </div>
  );
}

export default Login;

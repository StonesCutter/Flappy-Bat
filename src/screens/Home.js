import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUserData, cleanUserData } from "../utils/scoreListUtils";
import { decodeSkin } from "../utils/skinUtils";

import Input from "../components/ui/input/Input";
import GamePhrase from "../components/ui/gamePhrase/GamePhrase";
import Spritesheet from "react-responsive-spritesheet";
import ParallaxBG from "../components/ui/parallaxBG/ParallaxBG";
import click from "../assets/sounds/click.wav";
import bat from "../assets/images/bat.png";
import batBlue from "../assets/images/batBlue.png";
import batRed from "../assets/images/batRed.png";

import "../styles/home/home.css";

function Home() {
  const navigate = useNavigate();
  const { Howl, Howler } = require("howler");

  const [state, setState] = useState({
    isNameValid: false,
  });

  let messageToShow = "";

  let soundClick = new Howl({
    src: [click],
  });

  function goToGame() {
    console.log("go to game");
    soundClick.play();
    navigate("/Game");
  }

  function goToLogin() {
    cleanUserData();
    navigate("/");
    soundClick.play();
  }

  function goToRank() {
    navigate("/Ranking");
    soundClick.play();
  }

  function goToTutorial() {
    navigate("/Tutorial");
    soundClick.play();
  }

  function goToSkin() {
    navigate("/Skin");
    soundClick.play();
  }

  return (
    <div className="homeMain">
      <ParallaxBG />
      <div className="homeFirst">
        <GamePhrase
          classNameGamePhrase={"titleDefault"}
          h1GamePhrase={"Hello  " + getUserData().nameUser + "  !"}
        />
        {!state.isNameValid && messageToShow}
        <Spritesheet
          className={"posChar"}
          image={decodeSkin(bat, batBlue, batRed)}
          widthFrame={500}
          heightFrame={500}
          steps={6}
          fps={8}
          autoplay={true}
          loop={true}
          timeout={true}
        />
        <Input
          cssStyleInput={"defaultButton"}
          typeInput={"button"}
          valueInput={"Play"}
          onClickInput={goToGame}
        />
      </div>
      <div className="homeSecond">
        <Input
          cssStyleInput={"defaultButton"}
          typeInput={"button"}
          valueInput={"Ranking"}
          onClickInput={goToRank}
        />
        <Input
          cssStyleInput={"defaultButton"}
          typeInput={"button"}
          valueInput={"Tutorial"}
          onClickInput={goToTutorial}
        />
        <Input
          cssStyleInput={"defaultButton"}
          typeInput={"button"}
          valueInput={"Skin"}
          onClickInput={goToSkin}
        />
      </div>
      <div className="homeThird">
        <Input
          cssStyleInput={"defaultButton"}
          typeInput={"button"}
          valueInput={"LogOut"}
          onClickInput={goToLogin}
        />
      </div>
    </div>
  );
}

export default Home;

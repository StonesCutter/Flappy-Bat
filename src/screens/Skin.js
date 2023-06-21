import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  uploadSkinChoice,
  getScore,
  getUserData,
} from "../utils/scoreListUtils";

import Input from "../components/ui/input/Input";
import Spritesheet from "react-responsive-spritesheet";
import GamePhrase from "../components/ui/gamePhrase/GamePhrase";
import ParallaxBG from "../components/ui/parallaxBG/ParallaxBG";
import Coin from "../components/funcComponents/coin/Coin";
import bat from "../assets/images/bat.png";
import batBlue from "../assets/images/batBlue.png";
import batRed from "../assets/images/batRed.png";
import clickSkin from "../assets/sounds/clickSkin.flac";
import click from "../assets/sounds/click.wav";

import "../styles/skin/skin.css";

function Skin(props) {
  const navigate = useNavigate();
  let score = null;
  const [state, setState] = useState({
    skinMod: bat,
    skinBlock2: true,
    skinBlock3: true,
    allowed: true,
  });
  const { Howl, Howler } = require("howler");

  let clickChange = new Howl({
    src: [clickSkin],
  });
  let soundClick = new Howl({
    src: [click],
  });

  function goToHome() {
    navigate("/Home");
    soundClick.play();
  }

  function changeSkin(e) {
    clickChange.play();
    let skin = e.target.value;
    let skinChange = null;
    let skinAllowed = false;

    if (skin === "SkinOne") {
      skinChange = bat;
    } else if (skin === "SkinTwo") {
      skinChange = batBlue;
    } else {
      skinChange = batRed;
    }
    skinAllowed = isSkinAllowed(skinChange);
    console.log("skin allowed ?", skinAllowed);

    setState({
      skinMod: skinChange,
      allowed: skinAllowed,
    });
  }

  function isSkinAllowed(skin) {
    score = getScore(getUserData().nameUser);
    let skinAllowed = false;
    if (skin === batBlue && score > 2) {
      skinAllowed = true;
      return skinAllowed;
    } else if (skin === batBlue && score <= 2) {
      return skinAllowed;
    } else if (skin === batRed && score > 5) {
      skinAllowed = true;
      return skinAllowed;
    } else if (skin === batRed && score <= 5) {
      return skinAllowed;
    } else {
      skinAllowed = true;
      return skinAllowed;
    }
  }

  function applySkin() {
    let skinString = "bat";

    switch (state.skinMod) {
      case batBlue:
        skinString = "batBlue";
        break;
      case batRed:
        skinString = "batRed";
        break;
      default:
        skinString = "bat";
    }

    if (state.allowed) {
      uploadSkinChoice(skinString);
    }
    soundClick.play();
  }

  return (
    <div className="skinMain">
      <ParallaxBG />
      <div className="skinScore">
        <Coin />
        <GamePhrase
          classNameGamePhrase={"titleSkinScore"}
          h1GamePhrase={"Your Scores: " + getScore(getUserData().nameUser)}
        />
        <Coin />
      </div>
      <Spritesheet
        className={"charPos"}
        image={state.skinMod}
        widthFrame={500}
        heightFrame={500}
        steps={6}
        fps={8}
        autoplay={true}
        loop={true}
        timeout={true}
      />
      <div className="skinInput">
        {!state.allowed && (
          <div className="skinMsg">
            <h1>Not enough points for this skin!</h1>
          </div>
        )}
        <div className="skinRowTitle">
          <GamePhrase
            classNameGamePhrase={"titleSkin"}
            h1GamePhrase={"Skin 1"}
          />
          <GamePhrase
            classNameGamePhrase={"titleSkin"}
            h1GamePhrase={"Skin 2"}
          />
          <GamePhrase
            classNameGamePhrase={"titleSkin"}
            h1GamePhrase={"Skin 3"}
          />
        </div>
        <div className="skinRowPoints">
          <GamePhrase
            classNameGamePhrase={"titleSkinPoints"}
            h1GamePhrase={"Scores <= 2"}
          />
          <GamePhrase
            classNameGamePhrase={"titleSkinPoints"}
            h1GamePhrase={"Scores > 2"}
          />
          <GamePhrase
            classNameGamePhrase={"titleSkinPoints"}
            h1GamePhrase={"Scores > 5"}
          />
        </div>
        <div className="skinRowRadio">
          <Input
            cssStyleInput={""}
            nameInput={"skin"}
            valueInput={"SkinOne"}
            typeInput={"radio"}
            callbackInput={changeSkin}
          />
          <Input
            cssStyleInput={""}
            nameInput={"skin"}
            valueInput={"SkinTwo"}
            typeInput={"radio"}
            callbackInput={changeSkin}
          />
          <Input
            cssStyleInput={""}
            nameInput={"skin"}
            valueInput={"SkinThree"}
            typeInput={"radio"}
            callbackInput={changeSkin}
          />
        </div>
        <div className="skinColButton">
          <Input
            cssStyleInput={"defaultButton"}
            valueInput={"Apply Skin"}
            typeInput={"button"}
            onClickInput={applySkin}
          />
          <Input
            cssStyleInput={"defaultButton"}
            valueInput={"Back Home"}
            typeInput={"button"}
            onClickInput={goToHome}
          />
        </div>
      </div>
    </div>
  );
}

export default Skin;

/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useNavigate } from "react-router-dom";
import {Howl, Howler} from 'howler';
import Input from "../components/ui/input/Input";
import GamePhrase from "../components/ui/gamePhrase/GamePhrase";
import ParallaxBG from "../components/ui/parallaxBG/ParallaxBG";
import click from "../assets/sounds/click.wav";
import imgTut from "../assets/images/tutorial.png";
import "../styles/tutorial/tutorial.css";

function Tutorial(props) {
  
  const navigate = useNavigate()
  const {Howl, Howler} = require('howler');

  let soundClick = new Howl({
    src: [click]
  });

  function goToHome() {
    navigate("/Home");
    soundClick.play();
  };

  return (
    <div className="tutorialMain">
      <ParallaxBG/>
      <div className="tutorialCol">
          <img src={imgTut} className={"tutorialImg"}/>
          <GamePhrase
            classNameGamePhrase={"titleDefault"}
            h1GamePhrase={"Tap to Fly"}
          />
          <Input
            cssStyleInput={"defaultButton"}
            valueInput={"Back Home"}
            typeInput={"button"}
            onClickInput={goToHome}
          />
        </div>
    </div>
  );
};

export default Tutorial;
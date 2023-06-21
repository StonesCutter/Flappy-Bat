import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../input/Input";
import click from "../../../assets/sounds/click.wav";

import "./scoreCard.css";

function ScoreCard(props) {
  const navigate = useNavigate();
  const refresh = () => window.location.reload(true);
  const { Howl, Howler } = require("howler");
  const soundClick = new Howl({
    src: [click],
  });

  function goToHome() {
    navigate("/Home");
    soundClick.play();
  }

  function goToGame() {
    soundClick.play();
    refresh();
  }

  return (
    <div className={props.classNameScoreCard}>
      <div className={props.classNameScoreCardName}>
        <h1>{props.h1ScoreCardPosition}</h1>
        &ensp;
        <h1>{props.h1ScoreCardName}</h1>
        &ensp;
      </div>
      <div className={props.classNameScoreCardScore}>
        <h2>{props.h2ScoreCardScore}</h2>
        &ensp;
        <h2>{props.h2ScoreCardBestScore}</h2>
        &ensp;
        <h2>{props.h2ScoreCardTotScore}</h2>
      </div>
      <div className={props.classNameScoreCardInput}>
        <Input
          cssStyleInput={"defaultButton"}
          typeInput={"button"}
          valueInput={"Back Home"}
          onClickInput={goToHome}
        />
        <Input
          cssStyleInput={"defaultButton"}
          typeInput={"button"}
          valueInput={"Play Again"}
          onClickInput={goToGame}
        />
      </div>
    </div>
  );
}

export default ScoreCard;

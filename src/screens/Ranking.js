/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Howl, Howler } from "howler";
import Input from "../components/ui/input/Input";
import GamePhrase from "../components/ui/gamePhrase/GamePhrase";
import ParallaxBG from "../components/ui/parallaxBG/ParallaxBG";
import click from "../assets/sounds/click.wav";
import "../styles/ranking/ranking.css";
import { mapRankingList } from "../utils/scoreListUtils";

function Ranking(props) {
  const navigate = useNavigate();
  const { Howl, Howler } = require("howler");

  let soundClick = new Howl({
    src: [click],
  });

  function goToHome() {
    navigate("/Home");
    soundClick.play();
  }

  return (
    <div className="rankingMain">
      <ParallaxBG />
      <div className="rankingCol">
        <GamePhrase
          classNameGamePhrase={"titleDefault"}
          h1GamePhrase={"Top 5"}
        />
        {mapRankingList()}
        <Input
          cssStyleInput={"defaultButton"}
          valueInput={"Back Home"}
          typeInput={"button"}
          onClickInput={goToHome}
        />
      </div>
    </div>
  );
}

export default Ranking;

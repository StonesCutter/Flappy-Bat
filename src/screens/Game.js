import React, { Component, createRef } from "react";

import {
  moveObj,
  renderItems,
  pushToObjList,
  removePassedObjects,
  checkCollision,
  checkScore,
} from "../utils/gameMechanicsUtils";
import { getLocalStorage } from "../utils/localStorageUtils";

import {
  getUserData,
  uploadRankingList,
  getBestScore,
} from "../utils/scoreListUtils";

import ParallaxBG from "../components/ui/parallaxBG/ParallaxBG";
import Character from "../components/funcComponents/character/Character";
import Input from "../components/ui/input/Input";
import GamePhrase from "../components/ui/gamePhrase/GamePhrase";
import ScoreCard from "../components/ui/scoreCard/ScoreCard";
import Coin from "../components/funcComponents/coin/Coin";
import click from "../assets/sounds/click.wav";
import fly from "../assets/sounds/fly.wav";
import hit from "../assets/sounds/hit.mp3";
import coin from "../assets/sounds/coin.wav";
import gameSound from "../assets/sounds/gameSound.mp3";

import "../styles/game/game.css";

class Game extends Component {
  constructor(props) {
    super(props);

    this.charRef = createRef();

    this.coordinates = null;
    this.currentTop = 50;
    this.isFalling = false;
    this.pushUp = null;
    this.obsListAndScores = null;
    this.scoreCount = 0;
    this.bestScore = 0;
    this.movementParallax = "movement";

    this.obsList = [{}];
    this.gameOver = false;

    this.userName = null;
    this.skin = null;

    this.objData = null;

    this.state = {
      top: 0,
      collision: false,
      timePassed: null,
      finishGame: false,
    };

    const { Howl, Howler } = require("howler");
    this.soundClick = new Howl({
      src: [click],
    });
    this.soundFly = new Howl({
      src: [fly],
    });
    this.soundHit = new Howl({
      src: [hit],
    });
    this.soundCoin = new Howl({
      src: [coin],
    });
    this.soundGame = new Howl({
      src: [gameSound],
      autoplay: true,
      loop: true,
      volume: 0.05,
    });
    this.hasFallSoundPlayed = false;
  }

  componentDidMount() {
    this.objData = getUserData();
    this.userName = this.objData.nameUser;
    this.skin = this.objData.skinUser;
    this.movementParallax = "movement";
    this.soundGame.play();
  }

  componentDidUpdate() {
    this.coordinates = this.charRef.current.getButtonCoords();

    if (!this.gameOver) {
      this.gameOver = checkCollision(
        this.obsList,
        "obstacle",
        this.coordinates.left,
        this.coordinates.top,
        30,
        30
      );
    }

    this.isGameOver();

    if (!this.gameOver) {
      this.obsList = removePassedObjects(this.obsList);
      moveObj(this.obsList, 2);
      pushToObjList(this.obsList, this.state.timePassed, 20, "obstacle");

      this.obsListAndScores = checkScore(
        this.obsList,
        this.scoreCount,
        this.soundCoin
      );

      this.obsList = this.obsListAndScores.objList;
      this.scoreCount = this.obsListAndScores.scoreCount;
      this.bestScore = getBestScore(this.userName);
    }

    this.showGameOver(this.gameOver, this.currentTop);
  }

  /* ------- CHARACTER FUNCTIONS  ------ */

  goUp = () => {
    this.soundFly.play();
    this.pushUp -= 50;
  };

  goDown = () => {
    if (this.isFalling) {
      this.currentTop = parseInt(this.state.top);
      if (this.currentTop < 100) {
        this.currentTop += 5 + this.pushUp;
      } else {
        this.gameOver = true;
      }
      this.pushUp = 0;
    }
    this.setState({
      top: this.currentTop,
      timePassed: this.state.timePassed + 1,
      finishGame: this.gameOver,
    });
  };

  startFall = () => {
    this.soundClick.play();
    console.log("entrati nel start fall");
    this.isFalling = true;
    this.interval = setInterval(this.goDown, 50);
  };

  /* ------- GAMEOVER FUNCTIONS  ------ */

  isGameOver() {
    if (this.gameOver) {
      clearInterval(this.timer);
      this.currentTop = 40;
      if (this.isFalling) {
        uploadRankingList(this.userName, this.scoreCount);
        this.movementParallax = "stop";
      }
      this.isFalling = false;
    }
  }

  showGameOver(gameOver) {
    if (gameOver) {
      if (!this.hasFallSoundPlayed) {
        this.hasFallSoundPlayed = true;
        this.soundHit.play();
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.soundGame.stop();
  }

  render() {
    return (
      <div
        style={{ maxWidth: 1200, display: "flex", justifyContent: "center" }}
      >
        <div className="gameParallax" onClick={this.goUp}>
          <ParallaxBG movementStop={this.movementParallax} />
          {this.state.finishGame === true && (
            <div className="gameScoreCard">
              <ScoreCard
                classNameScoreCard={"scoreCardDefault"}
                classNameScoreCardScore={"scoreCardScore"}
                classNameScoreCardName={"ScoreCardName"}
                classNameScoreCardInput={"ScoreCardInput"}
                h1ScoreCardName={"Name: " + getLocalStorage("userData").name}
                h2ScoreCardScore={"Score: " + this.scoreCount}
                h2ScoreCardBestScore={"Old Best Score: " + this.bestScore}
              />
            </div>
          )}
          <div className="gameButton">
            <Input
              cssStyleInput={"defaultButton"}
              typeInput={"button"}
              valueInput={"Start"}
              onClickInput={this.startFall}
            />
          </div>
          <div className="gameScore">
            <Coin />
            <GamePhrase
              classNameGamePhrase={"titleDefault"}
              h1GamePhrase={"Score: " + this.scoreCount}
            />
            <Coin />
          </div>
          <div className="gameChar">
            <Character distanceTop={this.state.top} ref={this.charRef} />
          </div>
          {renderItems(this.obsList, "obstacle")}
          {renderItems(this.coinsList, "coin")}
        </div>
      </div>
    );
  }
}

export default Game;

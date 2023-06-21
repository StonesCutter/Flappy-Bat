import { setLocalStorage, getLocalStorage } from "./localStorageUtils";
import ScoreCardRanking from "../components/ui/scoreCardRanking/ScoreCardRanking";
import "../styles/common.css";

function genRankingList() {
  if (!getLocalStorage("rankingList")) {
    let rankingListData = [
      {
        id: Math.floor(Math.random() * 10000),
        name: "player1",
        totScore: 2,
        bestScore: 2,
      },
      {
        id: Math.floor(Math.random() * 10000),
        name: "player2",
        totScore: 3,
        bestScore: 2,
      },
      {
        id: Math.floor(Math.random() * 10000),
        name: "player3",
        totScore: 4,
        bestScore: 1,
      },
      {
        id: Math.floor(Math.random() * 10000),
        name: "player4",
        totScore: 5,
        bestScore: 4,
      },
    ];

    setLocalStorage("rankingList", rankingListData);
  }
}

function genUserData() {
  if (!getLocalStorage("userData")) {
    let userData = {
      name: "",
      skin: "bat",
    };
    setLocalStorage("userData", userData);
  }
}

function cleanUserData() {
  let userData = {
    name: "",
    skin: "bat",
  };
  setLocalStorage("userData", userData);
}

function uploadSkinChoice(skinChoice) {
  let userData = getLocalStorage("userData");
  let newUserData = null;
  newUserData = {
    name: userData.name,
    skin: skinChoice,
  };
  console.log("skin da caricare", newUserData);
  setLocalStorage("userData", newUserData);
}

function uploadRankingList(userName, currentScore) {
  let rankingList = getLocalStorage("rankingList");
  console.log("userName", userName);

  rankingList.find((el) => {
    if (el.name === userName) {
      console.log("el.name", el.name);
      el.totScore += currentScore;
      console.log("el.totScore updated", el.totScore);

      if (el.bestScore < currentScore) {
        el.bestScore = currentScore;
      }
    }
  });

  setLocalStorage("rankingList", rankingList);
}

function uploadUserData(userName) {
  let userData = getLocalStorage("userData");
  userData.name = userName;
  userData.skin = "bat";
  setLocalStorage("userData", userData);
}

function getUserData() {
  let userData = getLocalStorage("userData");
  let objData = {
    nameUser: "",
    skinUser: "",
  };
  if (userData) {
    objData.nameUser = userData.name;
    objData.skinUser = userData.skin;
  }
  return objData;
}

function getBestScore(userName) {
  let rankingList = getLocalStorage("rankingList");
  let bestScore = rankingList.find((el) => el.name === userName).bestScore;
  return bestScore;
}

function getScore(userName) {
  let rankingList = getLocalStorage("rankingList");
  let totScore = rankingList.find((el) => el.name === userName).totScore;
  return totScore;
}

function userExistsAlready(userName) {
  let rankingList = getLocalStorage("rankingList");
  if (rankingList.find((el) => el.name === userName).length !== 0) {
    return true;
  }
  return false;
}

function addNewUser(userName, messageToShow) {
  let rankingList = getLocalStorage("rankingList");
  let newUser = null;
  let allowedToPlay = false;

  if (userName === "") {
    messageToShow = "You can't enter with an empty name!";
    return allowedToPlay;
  }

  if (rankingList.filter((obj) => obj.name === userName).length === 0) {
    messageToShow = "Welcome, " + userName + "!";
    console.log("created new user:", messageToShow);
    newUser = {
      id: Math.floor(Math.random() * 10000),
      name: userName,
      totScore: 0,
      bestScore: 0,
    };
    console.log(" new user added", newUser);
    rankingList.push(newUser);
    setLocalStorage("rankingList", rankingList);
    allowedToPlay = true;
  } else {
    messageToShow = "Welcome back, " + userName + "!";
    allowedToPlay = true;
  }
  return allowedToPlay;
}

function mapRankingList() {
  let rankingList = getLocalStorage("rankingList");
  rankingList.sort(function (a, b) {
    return b.totScore - a.totScore;
  });

  return rankingList.slice(0, 5).map(function (item, i) {
    return (
      <div key={item.id} className={"listRanking"}>
        <ScoreCardRanking
          classNameScoreCardRanking={"scoreCardRankingDefault"}
          classNameScoreCardRankingName={"ScoreCardRankingName"}
          h1ScoreCardPosition={i + 1 + "°"}
          h1ScoreCardName={"Name: " + item.name}
          h2ScoreCardTotScore={"Total Score: " + item.totScore}
        />
      </div>
    );
  });
}

export {
  genRankingList,
  uploadRankingList,
  addNewUser,
  mapRankingList,
  genUserData,
  uploadUserData,
  getUserData,
  uploadSkinChoice,
  userExistsAlready,
  cleanUserData,
  getBestScore,
  getScore,
};

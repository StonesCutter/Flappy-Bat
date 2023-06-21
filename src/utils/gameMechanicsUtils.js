import Obstacle from "../components/funcComponents/obstacle/Obstacle";

function moveObj(objList, speed) {
  objList.map(function (item) {
    item.position = item.position - speed;
  });
}

function removePassedObjects(objList) {
  let filteredList = objList.filter((obj) => obj.position >= 0);
  return filteredList;
}

function pushToObjList(objList, time, speed, type) {
  //here we update the list of objects with the new one - push
  let randomHeight = null;
  let positionY = null;
  if (time % speed === 0) {
    if (type === "obstacle") {
      randomHeight = generateHeightObs();
      positionY = generateYPositionObj(randomHeight, "obstacle");
      objList.push({
        height: randomHeight,
        position: 100,
        top: positionY,
        rotate: rotateObstacle(positionY),
        scoreGiven: false,
      });
    }
  }
}

function generateNewObs(height, position, top, rotate) {
  return (
    <Obstacle
      customHeight={height}
      customPosition={position}
      customTop={top}
      customRotate={rotate}
    />
  );
}

function generateHeightObs() {
  return Math.floor(Math.random() * 30) + 20;
}

function generateYPositionObj(height, type) {
  if (type === "obstacle") {
    let top = null;
    Math.round(Math.random()) === 0 ? (top = 0) : (top = 100 - height);
    return top;
  }
}

function rotateObstacle(top) {
  let transformRotate = "rotate(0deg)";
  if (top === 0) {
    transformRotate = "rotate(180deg)";
  }
  return transformRotate;
}

function checkCollision(
  objList,
  type,
  charLeft,
  charTop,
  charWidth,
  charHeight
) {
  let collidableWidth = (charWidth * 100) / window.innerWidth;
  let collidableHeight = (charHeight * 100) / window.innerHeight;
  let collidablePosY = (charTop * 100) / window.innerHeight;
  let hasCollided = false;

  if (objList != null) {
    if (
      collidablePosY <= collidableHeight ||
      collidablePosY >= 100 - collidableHeight
    ) {
      return true;
    }

    let filteredList = objList.filter(
      (obj) =>
        obj.position >= 50 - collidableWidth &&
        obj.position <= 50 + collidableWidth
    );
    filteredList.map(function (item) {
      {
        if (
          (item.top === 0 &&
            item.height >= collidablePosY - collidableHeight) ||
          (item.top !== 0 &&
            100 - item.height <= collidablePosY + collidableHeight + 20)
        ) {
          console.log("Ha colliso!!");
          hasCollided = true;
        }
      }
    });

    if (hasCollided) {
      return true;
    } else {
      return false;
    }
  }
}

function checkScore(objList, scoreCount, soundCoin) {
  if (objList != null) {
    objList.map(function (item) {
      if (item.position < 40 && item.scoreGiven === false) {
        item.scoreGiven = true;
        scoreCount++;
        soundCoin.play();
      }
    });
    let objListAndScores = { objList, scoreCount };
    return objListAndScores;
  }
}

function renderItems(itemsList, type) {
  return itemsList?.map(function (item, key) {
    return (
      <div key={`${key}-${Math.random()}`}>
        {type === "obstacle" &&
          generateNewObs(item.height, item.position, item.top, item.rotate)}
      </div>
    );
  });
}

export {
  moveObj,
  generateNewObs,
  renderItems,
  pushToObjList,
  removePassedObjects,
  checkCollision,
  checkScore,
};

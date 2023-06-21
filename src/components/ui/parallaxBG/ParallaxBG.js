import React from "react";
import "./parallaxBG.css";

//import layer2 from "../../../assets/images/layerParallax2.png";
//import layer5 from "../../../assets/images/layerParallax5.png";
//import layer7 from "../../../assets/images/layerParallax7.png";

function ParallaxBG(props) {
  return (
    <div style={{ height: 690 }}>
      <div className="parallaxBG">
        <div
          className="parallaxM0"
          style={{
            animationName: `${props.movementStop}`,
          }}
        ></div>
        <div
          className="parallaxM1"
          style={{
            animationName: `${props.movementStop}`,
          }}
        ></div>
        <div
          className="parallaxM2"
          style={{
            animationName: `${props.movementStop}`,
          }}
        ></div>
      </div>
    </div>
  );
}
ParallaxBG.defaultProps = {
  movementStop: "movement",
};

export default ParallaxBG;

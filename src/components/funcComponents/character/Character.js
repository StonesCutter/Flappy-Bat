import { React, useRef, useEffect, forwardRef, useState } from "react";
import PropTypes from "prop-types";
import Spritesheet from "react-responsive-spritesheet";

import { getLocalStorage } from "../../../utils/localStorageUtils";

import bat from "../../../assets/images/bat.png";
import batBlue from "../../../assets/images/batBlue.png";
import batRed from "../../../assets/images/batRed.png";

import "./character.css";

const Character = forwardRef((props, ref) => {
  let charRef = useRef(null);

  const [state, setState] = useState({
    skin: selectSkin(),
  });

  function selectSkin() {
    let skin = getLocalStorage("userData").skin;
    let skinChosen = "bat";
    switch (skin) {
      case "batBlue":
        skinChosen = batBlue;
        break;
      case "batRed":
        skinChosen = batRed;
        break;
      default:
        skinChosen = bat;
    }

    return skinChosen;
  }

  useEffect(() => {
    if (ref) {
      ref.current = {
        getButtonCoords: () => {
          let buttonCoords = charRef.current.getBoundingClientRect();
          return {
            top: buttonCoords.top,
            left: buttonCoords.left,
            right: buttonCoords.right,
            bottom: buttonCoords.bottom,
            width: buttonCoords.width,
            height: buttonCoords.height,
          };
        },
      };
    }
  }, [ref]);

  return (
    <div
      className={"divRed"}
      ref={charRef}
      style={{
        transform: `translateY(${props.distanceTop}vh)`,
        transition: "0.3s ease-in",
      }}
    >
      <Spritesheet
        className={"divCharacter"}
        image={state.skin}
        widthFrame={500}
        heightFrame={500}
        steps={6}
        fps={8}
        autoplay={true}
        loop={true}
        timeout={true}
      />
    </div>
  );
});

export default Character;

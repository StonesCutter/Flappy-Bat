import { getLocalStorage } from "../utils/localStorageUtils";

function decodeSkin(bat, batBlue, batRed) {
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
      break;
  }
  console.log("skin scelta", skinChosen);
  return skinChosen;
}

export { decodeSkin };

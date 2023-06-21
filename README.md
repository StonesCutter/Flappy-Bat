----------------------- SCREENS --------------------------

1. LOGIN - functional component
   In this component the user insert the name, if the user already exists will be played. If it doesnt exist, will be created.

2. HOME - functional component
   In this component it is possible to access to all the other screens, a preview of the skin chosen is visible

3. TUTORIAL - functional component
   A brief explanatio on how to play

4. GAME - class component
   In this screen it is possible to play, pressing on the button "play". By tapping on the screen the bat will fly. If the bat hits the ceiling or the ground, the match is over. Same if it hits the stalls coming out of the borders of the screen. Every obstacle overcome it
   increases the total score. At the end of the game they are visible the score of the match and the previous best score achieved.

5. SKIN - functional component
   According to the amount of points gained it is possible to choose and apply a skin for the bat.

6. RANKING - functional
   This screen displays the top 5 players of the game sorted by totScore.

---------------------- COMPONENTS --------------------------

- Character
  is the component that constitutes the character in the screen game, through which the coordinates are passed in order to calculate
  advancement in the game and collisions.

- Obstacle
  is the component spawned randomly inside the game screen, with random height which is collided, terminates the game.

- Coin (obsolete) unused

---------------------- UI COMPONENTS -----------------------

- Game phrase
- Input
- parallaxBG
- ScoreCard
- ScoreCardRanking

--------------------- ASSETS --------------------------------

- Images
  the folder contains all the images used for the skins, parallax, stalls, tutorial and coin
- Sounds
  the folder contains all the sounds used for the click of the buttons, the choice of the skin, the gainin of scores, the fly flap,
  the game music and the hit sound effect

---------------------- UTILS -----------------------------

1. gameMechanicsUtils
   This file contains all the functions relative to the mechanics of the game, such as collision checks, generation of obstacles including their random size and positions, update of scores in case the obstacles are overcome.

2. skinUtils
   This file contain the function used to choose the skin according to the string passed

3. navigateUtils
   This file contains the utils used for the navigation

4. localStorageUtils
   This file contain the function utils to set and get the data from the local storage

5. scoreListUtils
   This file containt all the functions used to update the data of the ranking List and user data saved on the local storage, but also to
   get data from the local storage. It also contains the functions to initialize the local storage.

----------------- LOCAL STORAGE ---------------------------
The local storage contains two objects:

1. rankingList: contains the list of players saving their:

- id
- name
- totScore
- bestScore

2. userData: contains "temporary" informations about the current player:

- name
- skin

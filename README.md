# Description

## Screens
- **LOGIN** - functional component
   In this component the user insert the name, if the user already exists will be played. If it doesnt exist, will be created.
- **HOME** - hook component
   In this component it is possible to access to all the other screens, a preview of the skin chosen is visible
- **TUTORIAL** - functional component
   A brief explanatio on how to play
- **GAME** - class component
   In this screen it is possible to play, pressing on the button "play". By tapping on the screen the bat will fly. If the bat hits the ceiling or the 
   ground, the match is over. Same if it hits the stalls coming out of the borders of the screen. Every obstacle overcome it
   increases the total score. At the end of the game they are visible the score of the match and the previous best score achieved.
- **SKIN** - hook component
   According to the amount of points gained it is possible to choose and apply a skin for the bat.
- **RANKING** - functional component
   This screen displays the top 5 players of the game sorted by totScore.

## Components
- **Character** - is the component that constitutes the character in the screen game, through which the coordinates are passed in order to calculate
  advancement in the game and collisions.
- **Obstacle** - is the component spawned randomly inside the game screen, with random height which is collided, terminates the game.

## UI components
- **Game phrase**
- **Input**
- **parallaxBG**
- **ScoreCard**
- **ScoreCardRanking**

# Assets
- **Images** - the folder contains all the images used for the skins, parallax, stalls, tutorial and coin
- **Sounds** - the folder contains all the sounds used for the click of the buttons, the choice of the skin, the gainin of scores, the fly flap,
  the game music and the hit sound effect

# Utils
- **gameMechanicsUtils** - This file contains all the functions relative to the mechanics of the game, such as collision checks, generation of obstacles including their random size and positions, update of scores in case the obstacles are overcome.
- **skinUtils** - This file contain the function used to choose the skin according to the string passed
- **navigateUtils** - This file contains the utils used for the navigation
- **localStorageUtils** - This file contain the function utils to set and get the data from the local storage
- **scoreListUtils** - This file containt all the functions used to update the data of the ranking List and user data saved on the local storage, but also to
   get data from the local storage. It also contains the functions to initialize the local storage.

# Some images
![image](https://github.com/StonesCutter/Flappy-Bat/assets/56195722/e4fde36f-5356-445b-957b-7845be7da988)
![image](https://github.com/StonesCutter/Flappy-Bat/assets/56195722/a4670ee7-9362-4c25-ae50-899ad72e1d4e)
![image](https://github.com/StonesCutter/Flappy-Bat/assets/56195722/7719fe14-f17b-4a62-8245-05e7170a6e24)
![image](https://github.com/StonesCutter/Flappy-Bat/assets/56195722/96ad0993-7ed4-4fc0-98e5-ad3bef1266aa)
![image](https://github.com/StonesCutter/Flappy-Bat/assets/56195722/043cbba1-8603-41f6-910b-30fc56a95937)
![image](https://github.com/StonesCutter/Flappy-Bat/assets/56195722/25a2edc8-7cca-40c4-9223-a3624f4b3eb7)






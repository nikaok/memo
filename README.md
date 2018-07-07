# Memory Game Project

## Table of Contents

* [Game Rules](#game-rules)
* [How to Play](#how-to-play)
* [License](#license)

## Game Rules

* There are 16 cards in the deck
* In the score panel just above the deck, star rating, number of moves, timer and refresh button will be displayed
* **Star Rating:**
  - Star rating will be determined according to the criterias below:
  - #Moves =< 16  --> **5 Star**
  - 16 < #Moves <=20  --> **4 Star**
  - 20 < #Moves <= 24  --> **3 Star**
  - 24 < #Moves <= 28  --> **2 Star**
  - 28 < #Moves <= 32  --> **1 Star**
* **Moves:**
  - When the user open two cards consecutively, it is counted as one move
* **Timer:**
  - Timer starts when the user opens the first card.
  - Timer shows tens, seconds and minutes
* **Refresh Button:**
  - When the user pushes the refresh button, the deck shuffles and the game restarts.
  - Stars, number of moves and timer resets.

## How to Play

* User will open two cards:
  - If opened two cards match, the cards will stay opened
  - If cards do not match, the cards will close
* When the user matches all 16 cards, he/she will win the game
* When the user wins the game, a modal will be shown to the user
  - In the modal, final scores will be displayed
  - Final Scores content:
    - Stars the user won
    - Number of moves the user made
    - Time the user spent
    - "Play Again" button

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

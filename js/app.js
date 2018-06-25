/*
 * Create a list that holds all of your cards
 */
let deck = document.querySelector('.deck');
const cards = ["fa-diamond", "fa-diamond",
              "fa-paper-plane-o", "fa-paper-plane-o",
              "fa-anchor", "fa-anchor",
              "fa-bolt", "fa-bolt",
              "fa-cube", "fa-cube",
              "fa-leaf", "fa-leaf",
              "fa-bicycle", "fa-bicycle",
              "fa-bomb", "fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

generateCards();

const playAgainButton = document.getElementById('playAgainButton');

playAgainButton.addEventListener('click', playNewGame);

function playNewGame(){
   deck.innerHTML = "";
   modal.style.display = 'none';
   generateCards();
}

// Display the shuffled cards on the screen
function generateCards(){
    shuffledCards = shuffle(cards);
    shuffledCards.forEach(function(card){
        deck.innerHTML += `<li class="card" data-card= ${card}><i class="fa ${card}"></i></li>`;
    });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCards = [];
let moves = document.querySelector('.moves');
let numOfMoves = parseInt(moves.innerText);    // number of moves made by user
let counter = 0;   // to track the number of matched items

deck.addEventListener('click', displayCard);

function displayCard(event) {
  if(openCards.length < 2) {
    event.target.classList.add('open', 'show');
    openCards.push(event.target);
  }
  if (openCards.length == 2) {
    if(openCards[0].dataset.card === openCards[1].dataset.card) {
      openCards[0].classList.add('match', 'rotate-center');
      openCards[1].classList.add('match', 'rotate-center');
      openCards = [];
      counter++;

      // show the congratulations message to the user
      if(counter === 3) {
          displayFinalScore(getNumOfMoves());
      }
    }
    else {

      setTimeout(function(){
        openCards[0].classList.add('flip-vertical-right');
        openCards[1].classList.add('flip-vertical-right');
      }
       ,1000);

      setTimeout(function(){
        openCards[0].classList.remove('open', 'show', 'flip-vertical-right');
        openCards[1].classList.remove('open', 'show', 'flip-vertical-right');
        openCards = [];
      }
       ,1300);
    }
    updateMoves();
  }
}

// Update the number of moves
function updateMoves() {
  numOfMoves++;
  moves.innerText = numOfMoves;
  return numOfMoves;
}

function getNumOfMoves() {
  return updateMoves();
}

function displayFinalScore() {
    modal.style.display = "block";
    document.getElementById('list-moves').innerText = numOfMoves;
    document.getElementById('list-time').innerText = "simdilik TIME yok";
    document.getElementById('list-star').innerText = "simdilik STAR yok";
}


/*** MODAL ***/
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

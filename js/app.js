// Create a list that holds all of the cards
let deck = document.querySelector('.deck');
const cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
cards = cards.concat(cards);

const playAgainButton = document.querySelector('.playAgainButton');
let openCards = [];
let moves = document.querySelector('.moves');
let numOfMoves = parseInt(moves.innerText);    // number of moves made by user
let numOfMatchedCards = 0;   // to track the number of matched cards

// stars
const firstStar = document.getElementById('firstStar');
const secondStar = document.getElementById('secondStar');
const thirdStar = document.getElementById('thirdStar');
const fourthStar = document.getElementById('fourthStar');
const fifthStar = document.getElementById('fifthStar');

// timer variables
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const tens = document.getElementById('tens');
let IntervalReturnId;

const restartButton = document.querySelector('.restart');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

generateCards();

// restart the game when user pushes "Play Again" button on the modal
playAgainButton.addEventListener('click', playNewGame);

// Restart the game when the user pushes the refresh button on the screen
restartButton.addEventListener('click', playNewGame);

function playNewGame() {
    deck.innerHTML = "";
    numOfMoves = 0;
    moves.innerText = numOfMoves;
    numOfMatchedCards = 0; // reset the number of matched cards
    openCards = [];
    //reset timer
    tens.innerHTML = '00';
    seconds.innerHTML = '00';
    minutes.innerHTML = '00';
    clearInterval(IntervalReturnId);

    // reset stars
    firstStar.classList.add('checked');
    secondStar.classList.add('checked');
    thirdStar.classList.add('checked');
    fourthStar.classList.add('checked');
    fifthStar.classList.add('checked');

    modal.style.display = 'none';

    generateCards();
}

// Display the shuffled cards on the screen
function generateCards(){
    shuffledCards = shuffle(cards);
    shuffledCards.forEach(function(card){
        deck.innerHTML += `<li class="card" data-card= ${card}><i class="fa ${card}"></i></li>`;
    });
    deck.addEventListener('click', displayCard);
    deck.addEventListener('click', startTimer, {once: true});
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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

deck.addEventListener('click', displayCard);

function displayCard(event) {
    if(openCards.length < 2 &&
        !event.target.classList.contains('open') &&
        !event.target.classList.contains('fa') &&
        event.target.classList.contains('card'))
        {
            event.target.classList.add('open', 'show');
            openCards.push(event.target);

            if (openCards.length === 2) {

                if(openCards[0].dataset.card === openCards[1].dataset.card) {
                    openCards[0].classList.add('match', 'rotate-center');
                    openCards[1].classList.add('match', 'rotate-center');
                    openCards = [];
                    numOfMatchedCards++;
                }

                else {
                    setTimeout(function() {
                        openCards[0].classList.add('flip-vertical-right');
                        openCards[1].classList.add('flip-vertical-right');
                    }
                    ,1000);

                setTimeout(function() {
                    openCards[0].classList.remove('open', 'show', 'flip-vertical-right');
                    openCards[1].classList.remove('open', 'show', 'flip-vertical-right');
                    openCards = [];
                  }
                  ,1300);
                }

              updateMoves();
              updateStarRating();

              // if the user wins, show the final score modal to the user
              if(numOfMatchedCards === 8) {
                  displayFinalScore();
              }
            }
        }
}

// Update the number of moves
function updateMoves() {
    numOfMoves++;
    moves.innerText = numOfMoves;
}

// Update how many stars the user have
function updateStarRating() {
    if (numOfMoves > 16 && numOfMoves <=20) {
        fifthStar.classList.remove('checked');
    }
    else if (numOfMoves > 20 && numOfMoves <= 24) {
        fourthStar.classList.remove('checked');
    }
    else if (numOfMoves > 24 && numOfMoves <= 28) {
        thirdStar.classList.remove('checked');
    }
    else if (numOfMoves > 28 && numOfMoves <= 32) {
        secondStar.classList.remove('checked');
    }
}


function displayFinalScore() {
    modal.style.display = "block";
    document.getElementById('list-moves').innerText = numOfMoves;
    clearInterval(IntervalReturnId);
    document.getElementById('list-time').innerHTML = `${minutes.innerHTML}:${seconds.innerHTML}:${tens.innerHTML}`;
    document.getElementById('list-star').innerHTML = document.querySelector('.stars').outerHTML;
}


/*** MODAL ***/
// Get the modal
const modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    deck.removeEventListener('click', displayCard);
      modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        deck.removeEventListener('click', displayCard);
    }
}


/************ TIMER ******************/

/* Initiates the timer*/
function startTimer() {
    let counter = 0;
    let tensVal = 0;
    let secondsVal = 0;
    let minutesVal = 0;

    /*
    IntervalReturnId is the ID returned by setInterval method.
    ID will be used as parameter to clearInterval method to stop the timer
    */
    IntervalReturnId = setInterval(function() {
        counter++;

        tensVal = counter % 100;
        secondsVal = parseInt(counter / 100);

        if(secondsVal > 59) {
            secondsVal = secondsVal % 60;
        }
        minutesVal = parseInt (counter / 6000);

            tens.innerHTML = ('00' + tensVal).slice(-2);
            seconds.innerHTML = ('00' + secondsVal).slice(-2);
            minutes.innerHTML = ('00' + minutesVal).slice(-2);
    }
    ,10 );
}

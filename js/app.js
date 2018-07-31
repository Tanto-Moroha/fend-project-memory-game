const cards = [
  'fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor',
  'fa-bolt', 'fa-bolt',
  'fa-leaf', 'fa-leaf',
  'fa-cube', 'fa-cube',
  'fa-bicycle', 'fa-bicycle',
  'fa-bomb', 'fa-bomb'
];

const starRating = document.querySelector('.stars');

const movesCounter = document.querySelector('.moves');
let moves = 0;

const stopwatch = document.querySelector('.stopwatch');
let time = 0;

const restart = document.querySelector('.restart');
restart.addEventListener('click', restartGame);

let openedCards = [];
let matchedCards = [];

let myStopwatch;

function initGame() {
  const deck = document.querySelector('.deck');
  const cardsHTML = shuffle(cards).map(function(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
  });
  deck.innerHTML = cardsHTML.join('');

  moves = 0;
  movesCounter.textContent = moves;

  time = 0;
  stopwatch.textContent = time;

  cardsEventListenerSwitchOn(true);
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

function respondOnClick(ev) {
  if (ev.target.tagName === 'LI') {
    const card = ev.target;

    if (time === 0) {
      myStopwatch = setInterval(function() {
        time += 1;
        stopwatch.textContent = time;
      }, 1000);
    }

    // Open and show a card if it wasn't opened or matched earlier
    if (!card.classList.contains('open') && !card.classList.contains('match')) {
      card.classList.add('open', 'show');
      openedCards.push(card);

      // When two cards are open check if they match
      if (openedCards.length === 2) {
        // If they match, change their classes and move to a new array
        if (openedCards[0].dataset.card === openedCards[1].dataset.card) {
          openedCards.forEach(function(card) {
            card.classList.remove('open', 'show');
            card.classList.add('match');
            matchedCards.push(card);
          });
          openedCards = [];
        // If they are diffrent, clear their classes and clear an array
        } else {
          // First, prevent for clicking another card
          cardsEventListenerSwitchOn(false);
          // Show that they don't match using CSS (add a class)
          setTimeout(function() {
            openedCards.forEach(function(card) {
              card.classList.add('unsuccessful');
            });
          }, 1000);
          // Hide cards
          setTimeout(function() {
            openedCards.forEach(function(card) {
              card.classList.remove('open', 'show', 'unsuccessful');
            });
            openedCards = [];
            // "Unlock all cards"
            cardsEventListenerSwitchOn(true);
          }, 1500);
        }
        // Change a value of Moves Counter
        moves += 1;
        movesCounter.textContent = moves;
        // Change a value of Star Rating
        if (starRating.firstElementChild) {
          if (moves === 13 || moves === 15 || moves === 17) {
            starRating.removeChild(starRating.firstElementChild);
          }
        }
        // End of the game if the victory condition is met
        if (matchedCards.length === cards.length) {
          clearInterval(myStopwatch);
          setTimeout(displayCongratMsg, 1000);
        }
      }
    }
  }
}

function displayCongratMsg() {
  const message = confirm(`Congratulation. You matched all cards.\nYou did it in ${moves} moves.\nIt took you ${time} seconds.\nYour Star Rating is ${starRating.childElementCount}. Do you wish to play again?`);
  if (message) {
    restartGame();
  }
}

function restartGame() {
  location.reload();
}

initGame();

function cardsEventListenerSwitchOn(switchOn) {
  const allCards = document.querySelectorAll('.card');
  if (switchOn) {
    allCards.forEach(function(card) {
      card.addEventListener('click', respondOnClick);
    });
  } else{
    allCards.forEach(function(card) {
      card.removeEventListener('click', respondOnClick);
    });
  }
}

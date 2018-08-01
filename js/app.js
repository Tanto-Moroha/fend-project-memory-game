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

let openedCards = [];
let matchedCards = [];

const starRating = document.querySelector('.stars');
const movesCounter = document.querySelector('.moves');
const stopwatch = document.querySelector('.stopwatch');
const restart = document.querySelector('.restart');
const deck = document.querySelector('.deck');

let myStopwatch;

let moves = 0;
let time = 0;

function initGame() {
  const cardsHTML = shuffle(cards).map(function(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
  });
  deck.innerHTML = cardsHTML.join('');

  moves = 0;
  movesCounter.textContent = moves;

  time = 0;
  stopwatch.textContent = time;

  openedCards = [];
  matchedCards = [];
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

function respondOnClick(ev) {
  ev.stopPropagation();
  // Check if event target is a card
  if (ev.target.tagName === 'LI') {
    const card = ev.target;
    // Check if timer is running; switch it on if there is a need
    if (time === 0 && openedCards.length === 0) {
      myStopwatch = setInterval(function() {
        time += 1;
        stopwatch.textContent = time;
      }, 1000);
    }
    // Flip over a card if it's hidden
    if (!card.classList.contains('open') && !card.classList.contains('match')) {
      card.classList.add('open', 'show');
      openedCards.push(card);

      // When two cards are open, check if they match
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
          deck.removeEventListener('click', respondOnClick);
          // Show that they don't match using CSS; add a class; a time for animation needed
          setTimeout(function() {
            openedCards.forEach(function(card) {
              card.classList.add('unsuccessful');
            });
          }, 800);
          // Hide cards
          setTimeout(function() {
            openedCards.forEach(function(card) {
              card.classList.remove('open', 'show', 'unsuccessful');
            });
            openedCards = [];
            // "Unlock" events listener for all cards after operations above
            deck.addEventListener('click', respondOnClick);
          }, 1100);
        }
        // Change a value of Moves Counter and show it
        moves += 1;
        movesCounter.textContent = moves;
        // Change a value of Star Rating and show it
        if (moves === 13 || moves === 15) {
          if (starRating.firstElementChild) {
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
  clearInterval(myStopwatch);
  while (starRating.firstElementChild) {
    starRating.removeChild(starRating.firstElementChild);
  }
  starRating.innerHTML = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
  initGame();
}

restart.addEventListener('click', restartGame);
deck.addEventListener('click', respondOnClick);

initGame();

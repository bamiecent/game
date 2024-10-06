'use strict';

//SELECTING ELEMENTS
//PLAYERS
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

// TOTAL SCORES
const player1Total = document.querySelector('#score--0');
const player2Total = document.querySelector('#score--1');

//CURRENT SCORES
const player1Current = document.querySelector('#current--0');
const player2Current = document.querySelector('#current--1');

//OTHER ELEMENTS
const dice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

const init = function () {
  dice.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');

  player1Total.textContent = 0;
  player2Total.textContent = 0;
  player1Current.textContent = 0;
  player2Current.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  document
    .getElementById(`name--${activePlayer}`)
    .classList.add('activePlayer');
  scores = [0, 0];
};

// AT START OF GAME
let currentScore, activePlayer, scores;
init();
let playing = true;

// FUNCTIONALITY TO ROLL DICE
rollDice.addEventListener('click', function () {
  if (playing) {
    // Roll dice
    const diceValue = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${diceValue}.png`;

    // if diceValue = 1, clear sum and switch to next player
    if (diceValue === 1) {
      switchPlayer();
    }
    // else, add number to sum and continue on that player
    else {
      currentScore = currentScore + diceValue;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

// FUNCTIONALITY TO HOLD GAME
hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      console.log(`Player ${activePlayer} is VICTORIOUS!!!`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

// FUNCTIONALITY FOR NEW GAME
newGame.addEventListener('click', function () {
  init();
  playing = true;
});

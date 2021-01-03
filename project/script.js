'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const hideBtns = function () {
  diceEl.classList.add('hidden');
  btnRoll.classList.add('hidden');
  btnHold.classList.add('hidden');
};

const showBtns = function () {
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
};

//starting conditions
const setDefault = function () {
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;

  showBtns();
};

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

setDefault();

//rolling dice funtionality
btnRoll.addEventListener('click', function () {
  //generate random dice roll
  const diceNum = Math.trunc(Math.random() * 6) + 1;

  //display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${diceNum}.png`;

  //check for rolled 1: if true, switch to next player
  if (diceNum !== 1) {
    //add to current score
    currentScore += diceNum;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
  } else {
    //switch to next player
    currentScore += diceNum;
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  //add current score to active player score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  //check if player's score is >= 100
  //finish game
  if (scores[activePlayer] >= 10) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    hideBtns();
  }
  //switch player
  else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', setDefault);

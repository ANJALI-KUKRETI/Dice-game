"use strict";
const game = document.querySelector(".game-rules-title");
const wrapper = document.querySelector(".wrapper");
const inner = document.querySelector(".game-rules");
const cross = document.querySelector(".cross");
//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const score0EL = document.getElementById("score--0");
const score1EL = document.getElementById("score--1");
const current0EL = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnroll = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");

let scores, currentscore, activeplayer, playing;
const init = function () {
  scores = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1El.textContent = 0;

  diceEL.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functionality
btnroll.addEventListener("click", function () {
  //generating a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    //It 1 is displayed in dice move to the next player
    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      switchplayer();
    }
  }
});

btnhold.addEventListener("click", function () {
  //add current score to active player's score
  if (playing) {
    scores[activeplayer] += currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    //check if player score >=100
    if (scores[activeplayer] >= 100) {
      //finish game
      playing = false;
      diceEL.classList.add("hidden");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
    } else {
      switchplayer();
    }
  }
});
btnNew.addEventListener("click", init);

game.addEventListener("click", function () {
  wrapper.classList.remove("hidden");
  inner.classList.remove("hidden");
});
cross.addEventListener("click", function () {
  wrapper.classList.add("hidden");
  inner.classList.add("hidden");
});

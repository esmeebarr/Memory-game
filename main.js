//WHAT MY GAME WILL NEED TO DO:
//1. cards will be shuffled when game reloads
//2. game will react correctly to matched or unmatched cards
//3. game will show number of moves the player makes
//4. a timer will start when game begins and stop when game ends
//5. reset button will restart the game and timer
// cards array holds all cards

// THINGS I NEED TO WORK ON:
// 1. GET CONFETTI WORKING
// 2. STYLE POP UP MODAL BETTER
// 3. FIND A BETTER FONT
// 4. CHANGE PIC OF ONE CARD
// 5. ADD MUSIC?

// CARDS ARRAY -> ALL CARDS
let card = document.getElementsByClassName("card");
let cards = [...card];
console.log(cards);

// DECK OF ALL THE CARDS
const deck = document.getElementById("card-deck");

// DECLARING MOVES VARIABLE
let moves = 0;
let counter = document.querySelector(".moves");

// DECLARING MATCHED CARDS VARIABLE
let matchedCard = document.getElementsByClassName("match");

// DECLARING CLOSE POP UP
let closeicon = document.querySelector(".close");

// DECLARING POP UP
let modal = document.getElementById("popup1");

// ARRAY FOR OPEN CARDS
var openedCards = [];

// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// SHUFFLE CARDS WHEN REFRESHED/NEW GAME STARTED
document.body.onload = startGame();

// FUNCTION TO START A NEW GAME
function startGame() {
  // SHUFFLE CARDS
  cards = shuffle(cards);
  // REMOVES EXISTING CLASSES FROM CARDS
  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function (item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
  // RESET MOVES
  moves = 0;
  counter.innerHTML = moves;

  // RESET TIMER
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}

// OPEN TOGGLE AND DISPLAY CARD CLASSES
var displayCard = function () {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

// ADD OPEN CARDS TO OPENEDCARDS LIST AND CHECK IF THEY MATCH
function cardOpen() {
  openedCards.push(this);
  var len = openedCards.length;
  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
}

// WHEN CARDS DO MATCH
function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}

// WHEN CARDS DON'T MATCH
function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function () {
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
}

// DISABLE CARDS
function disable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.add("disabled");
  });
}

// ENABLE CARDS, DISABLE MATCHED CARDS
function enable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.remove("disabled");
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}

// COUNT PLAYER'S MOVES
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  //BEGIN TIMER ON FIRST CLICK
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
}

// TIMER
var second = 0,
  minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
  interval = setInterval(function () {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

// CONGRATULATIONS WHEN WIN, POP UP WITH MOVES & TIME
function congratulations() {
  if (matchedCard.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    // CONGRATULATIONS
    modal.classList.add("show");

    //MOVES AND TIME
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = finalTime;

    //EXIT POP UP
    closeModal();
  }
}

// ADDING CONFETTI
// var confettiSettings = { target: "my-canvas" };
// var confetti = new ConfettiGenerator(confettiSettings);
// confetti.render();

// var confettiElement = document.getElementById("my-canvas");
// var confettiSettings = { target: confettiElement };
// var confetti = new ConfettiGenerator(confettiSettings);
// confetti.render();

// EXIT POP UP
function closeModal() {
  closeicon.addEventListener("click", function (e) {
    modal.classList.remove("show");
    startGame();
  });
}

// PLAY AGAIN
function playAgain() {
  modal.classList.remove("show");
  startGame();
}

// LOOP ADDING EVENT LISTENERS TO EACH CARD
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
}

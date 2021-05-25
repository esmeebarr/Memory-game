//WHAT MY GAME WILL NEED TO DO:
//1. cards will be shuffled when game reloads
//2. game will react correctly to matched or unmatched cards
//3. game will show number f moves the player makes
//4. a timer will start when game begins and stop when game ends
//5. reset button will restart the game and timer
//6. a winning message should appear when the game is completed showing time taken and a play again option

// for loops instead of event listeners
// using an array for list of cards
let card = document.getElementsByClassName("card");
let cards = [...card];
// use a loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", displayCard);
}
// toggle open and show class to display cards so that a card cant be clicked on again until it is closed
var displayCard = function () {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

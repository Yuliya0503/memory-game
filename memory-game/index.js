/*constants*/

const card = document.querySelectorAll ('.card');
const wrapperCard = document.querySelector('.wrapper-card');
let blockCard = false; 
let flippedCard = false;
let oneCard, secondCard;
let click = -1;
let win = 0;
let score = 0;
let time = 0;
let steps = 0;
const timesElement = document.querySelector('.times');
const scoreElement = document.querySelector('.score');
const fineElement = document.querySelector('.fine');
const resultElement = document.querySelector('.result');
const replayElement = document.querySelector('.replay');


/*card flip */

function flipCard() {
  if (blockCard) return; // prevents any flipping of the card before the result. 
  if (this === oneCard) return;

  this.classList.add('flip'); //flipping the card when pressed. 
  steps += 1;
  if (click === -1){
    timer = setInterval(function() { //time counter 
      time++;
      timesElement.innerHTML = time;
    }, 1000);
  }
  click = 1;

  if(!flippedCard) { //if the card is not turned over
    flippedCard = true;
    oneCard = this;
    return;
  }

  secondCard = this;

  checkMach();
}

function checkMach() { //check if both cards match 
  if (oneCard.dataset.frame === secondCard.dataset.frame) {
    disCards();
    return;
  }
  unCards();
}

function disCards() { // if the cards match, the event handler is disabled (prevents further switching) 
  oneCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  score +=  1;
  win += 2;
  scoreElement.innerHTML = score;
  if (win === 12) {
    clearInterval(timer);
    resultElement.innerHTML = "You won " + score + " points, <br> " + steps + " steps and " + time + " seconds";
    fineElement.classList.remove ('modal');
  }

  boardRes ();
}

function unCards() { // returns 2 cards to their original state + removal of the "flip" class
  blockCard = true;

  setTimeout(() => {
    oneCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    boardRes();

  }, 1000);
  if (score > 0) {
    score -= 1;
  }
  scoreElement.innerHTML = score;
}

function boardRes(){ //reset variables after each round
  flippedCard = false;
  blockCard = false;
  oneCard = null;
  secondCard = null;
}

(function mixing(){ // card shuffle 
  card.forEach(elem => {
    let random = Math.floor(Math.random () * (card.length - 1));
    elem.style.order = random;
  });
})();

card.forEach(card => card.addEventListener('click', flipCard));

replayElement.addEventListener('click', replayGame);

function replayGame() { //replay
  click = -1;
  win = 0;
  score = 0;
  time = 0;
  steps = 0;
  fineElement.classList.add ('modal');
  timesElement.textContent = time;
  scoreElement.textContent = score;
  card.forEach(n => n.classList.remove('flip'));
  card.forEach(card => card.addEventListener('click', flipCard));
  
  (function mixing(){ 
    card.forEach(elem => {
      let random = Math.floor(Math.random () * (card.length - 1));
      elem.style.order = random;
    });
  })();
}
console.log('60/60');
console.log("1. реализован интерфейс игры +5");
console.log("2. в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5");
console.log("3. Логика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10");
console.log("4. Игра завершается, когда открыты все карточки +10");
console.log("5. По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10");
console.log('6. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр "-"');
console.log('7. По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверхv +10');
console.log('8. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10');
//https://rolling-scopes-school.github.io/yuliya0503-JSFEPRESCHOOL/memory-game/
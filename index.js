
let resultScore = JSON.parse(localStorage.getItem('resultScore')) ||
{
  wins: 0,
  losses : 0,
  ties : 0
};

updateScore();

//Computer randomly selects a move
function pickComputerMove(){
  let computerMove = '';
  const randomNumber = Math.random();

  if(randomNumber >= 0 && randomNumber <= 1/3){
    computerMove = 'rock';
  } else if(randomNumber >= 1/3 && randomNumber <= 2/3){
    computerMove = 'paper'
  } else if(randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'scissors'
  }
  return computerMove; //use a return statement to take advandtage of the benefits of scope
}

//after having a computerMove
function playGame (playerMove) {
  const computerMove = pickComputerMove(); //call the function -> run the code inside the function -> return a value

  let result = '';

  if(playerMove === 'rock'){
    if(computerMove === 'rock'){
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'you won.';
    }
  } else if (playerMove === 'paper') {
      if (computerMove === 'paper'){
        result = 'Tie.'
    } else if (computerMove === 'scissors') {
        result = 'You lose.'
    } else if(computerMove === 'rock'){
      result = 'You win.'
    }
  } else if (playerMove === 'scissors') {
      if (computerMove === 'scissors'){
        result = 'Tie.'
    } else if (computerMove === 'rock') {
        result = 'You lose.'
    } else if(computerMove === 'paper'){
      result = 'You win.'
    }
  }

  if(result === 'You win.') {
    resultScore.wins++;
  } else if (result === 'You lose.') {
    resultScore.losses++;
  } else if (result === 'Tie.') {
    resultScore.Ties++;
  }

  localStorage.setItem('resultScore', JSON.stringify(resultScore));

  updateScore();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You <img class="move-icon" src="image/${playerMove}-emoji.png"><img class="move-icon" src="image/${computerMove}-emoji.png"> Computer`;
}

//addEventListener and pass a parameter for a function 
document.querySelector('.js-rock-btn')
  .addEventListener('click', () => {
    playGame('rock');
});
document.querySelector('.js-paper-btn')
  .addEventListener('click', () => {
    playGame('paper');
  });
document.querySelector('.js-scissors-btn')
  .addEventListener('click', () => {
   playGame('scissors');
});

document.querySelector('.js-reset-score-btn')
  .addEventListener('click', () => {
    resultScore.wins = 0;
    resultScore.losses = 0;
    resultScore.ties = 0;
    //localStorage.removeItem('resultScore');
    updateScore();
});

function updateScore () {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${resultScore.wins}. Losses: ${resultScore.losses}. ties: ${resultScore.ties}`;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay (){
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      const randomComputerMove = pickComputerMove();
    playGame(randomComputerMove);
    }, 1000);
    document.querySelector('.js-auto-play-btn')
      .innerHTML = 'Stop Auto Play';
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-btn')
      .innerHTML = 'Auto Play';
  }
}
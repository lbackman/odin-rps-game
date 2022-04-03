let playerScore = 0;
let computerScore = 0;
let i = 0;

let para = document.querySelector('#result');
let round = document.querySelector('#round');
let current = document.querySelector('#current');
let p1s = document.querySelector('#player'); // p1s = player score
let p2s = document.querySelector('#computer'); // p2s = computer score
let final = document.querySelector('#final-result');
let restart = document.querySelector('#restart-button');

const buttons = document.querySelectorAll('button.rps');
buttons.forEach((button) => {
    button.addEventListener('click', function() {
        
        const choice = button.textContent;
        const computer = computerPlay();
        let result = playRound(choice, computer);
        para.classList.remove('disabled');
        
        if (result === 'draw') {
            round.textContent = `You both picked ${choice.toLowerCase()}; 
              that's a draw.`;
            i++;
            current.textContent = i;

        } else if(result === 'lose') {
            round.textContent = `You lose this round. ${computer} 
              beats ${choice.toLowerCase()}.`;
            i++;
            computerScore++;
            current.textContent = i;
            p2s.textContent = computerScore;
            if (computerScore >= 5 && playerScore < 5) {
                final.textContent = "You lost. Better luck next time!";
                buttons.forEach( button => button.disabled = true );
                restart.classList.remove('disabled');
                restart.addEventListener('click', playAgain);
            }

        } else {
            round.textContent = `You win the round! ${choice} beats 
              ${computer.toLowerCase()}.`;
            i++;
            playerScore++;
            current.textContent = i;
            p1s.textContent = playerScore;
            if (playerScore >= 5 && computerScore <5) {
                final.textContent = "You won! Congratulations!";
                buttons.forEach( button => button.disabled = true );
                restart.classList.remove('disabled');
                restart.addEventListener('click', playAgain);
            }
        }
        
    }); 
});

function playAgain() {
    restart.classList.add('disabled');
    para.classList.add('disabled');
    buttons.forEach( button => button.disabled = false );
    playerScore = 0;
    computerScore = 0;
    i = 0;
    p1s.textContent = playerScore;
    p2s.textContent = computerScore;
    round.textContent = '';
    current.textContent = i;
    final.textContent = '';
}

function computerPlay() {
    
    const compChoice = Math.floor(Math.random()*3) + 1;

    if (compChoice === 1) {
        return "Rock";
    } else if (compChoice === 2) {
        return "Paper";
    } else {
        return "Scissors";
    }
}

function playRound(arg, comp) {

    if (arg == comp) {
        return 'draw';

    } else if ((arg == "Rock" && comp == "Paper") || 
          (arg == "Paper" && comp == "Scissors") || 
          (arg == "Scissors" && comp == "Rock")) {
        return 'lose';

    } else {
        return 'win';
    }
}
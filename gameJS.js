const UIgame = document.querySelector('.game'),
    UIplayBtn = document.querySelector('.play-btn'),
    UIintro = document.querySelector('.intro'),
    UImatch = document.querySelector('.match');

//game score variable
let cScore = 0;
let pScore = 0;

//START the game after clicking PLAY btn
function startGame() {
    UIplayBtn.addEventListener('click', () => {
        //fadeout intro and fadein match
        UIintro.classList.add('fadeOut');
        UImatch.classList.add('fadeIn');
    });
}
//call startGame()
startGame();

//play the game
function playGame() {
    const options = document.querySelectorAll('.options button');
    const computerHand = document.querySelector('.computer-hand');
    const playerHand = document.querySelector('.player-hand');
    //animation remove 
    const hands = document.querySelectorAll('.hands img');
    hands.forEach(hand => {
            hand.addEventListener('animationend', function() {
                this.style.animation = '';
            })
        })
        //computer options
    const computerOptions = ['rock', 'paper', 'scissor'];

    //Assign random choice to computer on click of user choice
    options.forEach(option => {
        option.addEventListener('click', function() {
            //computer's choice
            const cNumber = Math.floor(Math.random() * 3);
            const computerChoice = computerOptions[cNumber];

            //set default rock hand while animation
            computerHand.src = `img/rock_c.png`;
            playerHand.src = `img/rock_p.png`;

            //set timeout for animation
            setTimeout(() => {
                //compare hands
                compareHands(this.textContent, computerChoice);
                //change hands imgs
                computerHand.src = `img/${computerChoice}_c.png`;
                playerHand.src = `img/${this.textContent}_p.png`;
            }, 1200)

            //hand animation
            computerHand.style.animation = 'shakeComputer 1.2s ease';
            playerHand.style.animation = 'shakePlayer 1.2s ease';
        })
    })
}
//call play game fucntion
playGame();
//compare hands to find result
function compareHands(playerChoice, computerChoice) {
    //Update Text
    const winner = document.querySelector('.winner');
    //TIE case
    if (playerChoice === computerChoice) {
        winner.textContent = 'It is a TIE!';
        return;
    }
    //Check for ROCK
    if (playerChoice === 'rock') {
        //compare with computer
        if (computerChoice === 'scissor') {
            winner.textContent = 'Player WINS';
            pScore++;
            updateScore();
            return;
        } else {
            winner.textContent = 'Computer WINS';
            cScore++;
            updateScore();
            return;
        }
    }

    //Check for SCISSOR
    if (playerChoice === 'scissor') {
        //compare with computer
        if (computerChoice === 'paper') {
            winner.textContent = 'Player WINS';
            pScore++;
            updateScore();
            return;
        } else {
            winner.textContent = 'Computer WINS';
            cScore++;
            updateScore();
            return;
        }
    }

    //Check for PAPER
    if (playerChoice === 'paper') {
        //compare with computer
        if (computerChoice === 'rock') {
            winner.textContent = 'Player WINS';
            pScore++;
            updateScore();
            return;
        } else {
            winner.textContent = 'Computer WINS';
            cScore++;
            updateScore();
            return;
        }
    }
}

//Update scores
function updateScore() {
    const computerScore = document.querySelector('.computer-score p');
    const playerScore = document.querySelector('.player-score p');
    //checking if score is 5
    if (cScore === 5 || pScore === 5) {
        computerScore.textContent = cScore;
        playerScore.textContent = pScore;
        if (cScore === 5) {
            alert('Computer won the match!');
            restartGame();
        } else {
            alert('YOU won the match!');
            restartGame();
        }
        cScore = 0;
        pScore = 0;
    }
    //update the score
    computerScore.textContent = cScore;
    playerScore.textContent = pScore;
}
//restart game
function restartGame() {
    window.location.reload();
}

/*
//game over function
function gameOver(msg) {
    //add error div
    const msgDiv = document.createElement('div');
    //error classname
    msgDiv.className = 'alert alert-success';
    //append error text to div
    msgDiv.appendChild(document.createTextNode(msg));
    //including parent elements
    UImatch = document.querySelector('.match');
    const hands = document.querySelectorAll('.hands');
    UImatch.insertBefore(msgDiv, hands);

    setTimeout(clearMsg, 2000);
}
//clear msg
function clearMsg() {
    document.querySelector('.alert').remove();
    restartGame();
}
*/
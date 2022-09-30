// Global
const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')
var helpButtonEl = document.getElementById("help");
var helpModalEl = document.getElementById("help-modal");
var helpCloseEl = document.querySelector(".help-modal-close");
var scoreModalEl = document.getElementById("highscore-modal");
var scoreCloseEl = document.querySelector(".score-modal-close");
var scoreButtonEl = document.getElementById("highscore");
var wordDefEl = document.querySelector("#randomDef");
var timeEl = document.querySelector("#timer");
var timeModalEl = document.getElementById("time-modal")
var modalCloseEl = document.querySelector(".modal-close");
var startBtnEl = document.querySelector("#start-btn");
var scoresCount = document.querySelector("#scores-count")
var winDisplay = document.querySelector('#win-count');
var lossDisplay = document.querySelector('#loss-count')
var playAgainBtnEl = document.querySelector("#play-again-btn")
var winPlayAgainBtn = document.querySelector("#win-play-again")
var winCloseEl = document.querySelector(".win-modal-close");
var winModalEl = document.querySelector("#win-modal")
var wordIs = "EASY"
// var wordIs = " ";
var winCount = 0;
var lossCount = 0;
var timer;
var secondsLeft;
     
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'BACK',
]

const guessRows = [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
]

// Lets game begin from very first tile.
let currentRow = 0
let currentTile = 0
let isGameOver = false

// Inserts tiles into array in place of ''.
guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((_guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

// Appends keys to keyboard and makes them buttons.
keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
});

// Assigns ENTER key to input letters while BACK deletes.
const handleClick = (letter) => {
    console.log('clicked', letter)
    if (letter === 'BACK') {
        deleteLetter()
        console.log('guessRows', guessRows)
        return
    }
    if (letter === 'ENTER') {
        checkRow()
        console.log('guessRows', guessRows)
        return
    }
    addLetter(letter)
    console.log('guessRows', guessRows)
    console.log(wordIs);
}

// Assigns onscreen keyboard push down event.
const addLetter = (letter)=> {
    if (currentTile < 4 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++ 
    }
}

// Assigns BACK button to delete letters.
const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

// Stops user from being able to replace letters once row completed.
// Also dictates if game is over and adds counts for total wins/losses 
const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    // Adds comment for finding the correct word.
    if (currentTile > 3) {       
        console.log('What is the word? ' + guess, 'The word is ' + wordIs)
        flipTile()
        if (secondsLeft !== 0 && wordIs === guess) {
            isGameOver = true
            gameWin();
            return
            // Adds comment for not finding correct word after 6 attempts
        } else {
            if (currentRow < 6) {
                currentRow++
                currentTile = 0
            }
            if (secondsLeft < 1 || currentRow >= 6) {
                isGameOver = false;
                gameLoss();
                return
            }
        }
    }
}

//function to show keyboard that is called when the game is started in startGame() function 
function showKeyboard() {
    keyboard.style.zIndex = "10";
}

//function to start game, sets time to 60 seconds and starts the timer countdown 
function startGame() {
    isGameOver = false; //????????????
    secondsLeft = 60;
    startTimer();
}

//starts the timer, sets the interval and counts down with displayed text
//clears the timer interval when time reaches 0 and shows the modal to indicate the game is over 
function startTimer() {
    timer = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time left: " + secondsLeft + " s";
        showKeyboard();

        if(secondsLeft === 0) { 
            clearInterval(timer);
            showTimeModal();
          };
    }, 1000);
};

//UPDATES WINS/LOSSES

// functions for storing the wins/counts and setting as the updated count in local storage 
function storeScores() {
    localStorage.setItem("winCount", winCount);
    localStorage.setItem("lossCount", lossCount);
}

// retrieves the stored wins to count and display in the high score modal 
function getWins() {
    var storedWins = localStorage.getItem("winCount");
    // ensures there is a stored value, otherwise 0 
    if (storedWins === null) {
      winCount = 0;
    } else {
      // updates the stored wins to the number of wins stored in the local storage 
      winCount = storedWins;
    }
    // displays the number of wins on the high score modal 
    winDisplay.textContent = winCount;
    }

// retrieves the stored losses to count and display in the high score modal 
function getLosses() {
    var storedLosses = localStorage.getItem("lossCount");
    // ensures there is a stored value, otherwise 0
    if (storedLosses === null) {
        lossCount = 0;
    } else {
        // updates the stored losses to the number of losses stored in the local storage 
        lossCount = storedLosses;
    }
    //displasy the number of losses on the high score modal 
    lossDisplay.textContent = lossCount;
    }

// displays the modal for when the user wins the game 
function showWinModal() {
    winModalEl.style.display="block";
}

//closes the win modal for when the user clicks the "X" button 
winCloseEl.addEventListener ('click',function() {
    winModalEl.style.display="none";
  });

// function that runs when the user guesses the correct word and wins the game; increases the win count, clears the interval, stores the score and shows the win modal 
function gameWin() {
    showMessage('That is the word!')
    winCount++;
    clearInterval(timer);
    showWinModal();
    storeScores();
    }

// function that runs when the time either runs out or they use up all attempts without guessing the word; shows game over modal, increases loss count, clears the interval and stores the new score
function gameLoss() {
    showMessage('Game Over');
    lossCount++;
    clearInterval(timer);
    showTimeModal();
    storeScores();
}

// function runs in order to retrive the number of wins/losses to display 
function init() {
    getWins();
    getLosses();
    }

init();

// Message for guessing correct word created under p and times out.
const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 1000)
}

// Function to make colours apply to keyboard as well.
const addColourToKey = (keyLetter, colour) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(colour)
}
// Flips tiles while generating colour overlay for correct, wrong, and misplaced letters. 
const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordIs = wordIs
    const guess = []
    // Each tile will have a colour display unique to that tile specifically like actual Wordle.
    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), colour: 'grey-overlay'})
    })
    
        guess.forEach((guess, index) => {
            if (guess.letter == wordIs[index]) {
                guess.colour = 'green-overlay'
                checkWordIs = checkWordIs.replace(guess.letter, '')
            }
        })

        guess.forEach(guess => {
            if (checkWordIs. includes(guess.letter)) {
                guess.colour = 'yellow-overlay'
                checkWordIs = checkWordIs.replace(guess.letter, '')
            }
        })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => { 
            tile.classList.add('flip')
            tile.classList.add(guess[index].colour)
            addColourToKey(guess[index].letter, guess[index].colour)             
        }, 500 * index)
    })
}

// TIMER

//displays modal either when time is up or all attempts are used 
function showTimeModal() {
  timeModalEl.style.display="block";
};

//closes the modal when the "x" is clicked 
modalCloseEl.addEventListener ('click',function() {
  timeModalEl.style.display="none";
});

//start button allows the startGame function to run, allowing for the keyboard to appear, timer to run and game to start
startBtnEl.addEventListener('click', startGame)

 // High Score modal 

 // opens modal when the high score button is clicked 
 scoreButtonEl.addEventListener ('click',function() {
  scoreModalEl.style.display="block";
});

//closes modal when the "x" button is clicked 
scoreCloseEl.addEventListener('click',function() {
  scoreModalEl.style.display="none";
});

 // opens modal when the help button is clicked 
 helpButtonEl.addEventListener ('click',function() {
    helpModalEl.style.display="block";
  });
  
  //closes modal when the "x" button is clicked 
  helpCloseEl.addEventListener('click',function() {
    helpModalEl.style.display="none";
  });

// allows user to play again when "play again" button is clicked; refreshes the page which resets the game and updates the scores 
playAgainBtnEl.addEventListener('click', function() {
    window.location.reload();
})

// allows user to play again when "play again" button is clicked; refreshes the page which resets the game and updates the scores 
winPlayAgainBtn.addEventListener('click', function() {
    window.location.reload();
})

// APIS 

// random word API -> randomly selects a word with a length of 4 characters as the word needed to be guessed 

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '62c6f6566emsh794f8b2c7702c7cp11de96jsn9f8a11c6fe5c',
// 		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
// 	}
// };

// fetch('https://random-words5.p.rapidapi.com/getMultipleRandom?count=2&wordLength=4', options)
// 	.then(response => response.json())
// 	.then(function (response) {
//             console.log(response[0]);
//             wordIs = response[0].toUpperCase();
//     });

// console.log(wordIs);

// organize-js
// // random definition at footer API --> randomly displays a dutch word with translation/definition and dutch pronunciation

// const options2 = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '62c6f6566emsh794f8b2c7702c7cp11de96jsn9f8a11c6fe5c',
// 		'X-RapidAPI-Host': 'random-words-with-pronunciation.p.rapidapi.com'
// 	}
// };

// fetch('https://random-words-with-pronunciation.p.rapidapi.com/word/dutch', options2)
// 	.then(response => response.json())
// 	.then(function (response2) {
//         wordDefEl.textContent = JSON.stringify(response2);
//     });





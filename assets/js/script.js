// Global
const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')
var scoreModalEl = document.getElementById("highscore-modal");
var scoreCloseEl = document.querySelector(".score-modal-close");
var scoreButtonEl = document.getElementById("highscore");
var wordDefEl = document.querySelector("#randomDef");
var timeEl = document.querySelector("#timer");
var timeModalEl = document.getElementById("time-modal")
var modalCloseEl = document.querySelector(".modal-close");
var scoresCount = document.querySelector("#scores-count")
var winDisplay = document.querySelector('#win-count');
var lossDisplay = document.querySelector('#loss-count')
var secondsLeft = 60;
var wordIs = " ";
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

// Lets game begin from vry first tile.
let currentRow = 0
let currentTile = 0
let isGameOver = false

// Inserts tiles into array in place of ''.
guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
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
    if (letter === 'BACK') {
        deleteLetter()
        return
    }
    if (letter === 'ENTER') {
        checkRow()
        return
    }
    addLetter(letter)
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
        flipTile()
        if (secondsLeft !== 0 && wordIs === guess) {
            isGameOver = true
            gameWin();
            return
            
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

function showKeyboard() {
    keyboard.style.zIndex = "10";
}

function hideKeyboard() {
    keyboard.style.zIndex="-10";
}

function startGame() {
    isGameOver = false; //????????????
    secondsLeft = 60;
    startTimer();
}

function startTimer() {
    timer = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time left: " + secondsLeft + " s";
        showKeyboard();

        if(secondsLeft === 0) { 
            clearInterval(timer);
            showTimeModal();
            //add code here for stopping game ?
          };
    }, 1000);
};

// functions for storing the wins/counts

function storeScores() {
    localStorage.setItem("winCount", winCount);
    localStorage.setItem("lossCount", lossCount);
}

function getWins() {
    // Get stored value from client storage, if it exists
    var storedWins = localStorage.getItem("winCount");
    // If stored value doesn't exist, set counter to 0
    if (storedWins === null) {
      winCount = 0;
    } else {
      // If a value is retrieved from client storage set the winCounter to that value
      winCount = storedWins;
    }
    //Render win count to page
    winDisplay.textContent = winCount;
    }

function getLosses() {
    var storedLosses = localStorage.getItem("lossCount");
    if (storedLosses === null) {
        lossCount = 0;
    } else {
        lossCount = storedLosses;
    }
    lossDisplay.textContent = lossCount;
    }

function gameWin() {
    showMessage('That is the word!')
    winCount++;
    clearInterval();
    storeScores();
    }

function gameLoss() {
    showMessage('Game Over');
    lossCount++;
    clearInterval();
    storeScores();
}

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

// Timer

function showTimeModal() {
  timeModalEl.style.display="block";
};

modalCloseEl.addEventListener ('click',function() {
  timeModalEl.style.display="none";
});

var startBtnEl = document.querySelector("#start-btn");

//starts the game/timer 
startBtnEl.addEventListener('click', function() {
    var timerInterval = setInterval(function() { 
      secondsLeft--; 
      timeEl.textContent = "Time left: " + secondsLeft + " s";
  
      if(secondsLeft === 0) { 
        clearInterval(timerInterval);
        showTimeModal();
        //add code here for stopping game ?
      };
  
    }, 1000); 
  });


 // High Score modal 

 scoreButtonEl.addEventListener ('click',function() {
  scoreModalEl.style.display="block";
});

scoreCloseEl.addEventListener('click',function() {
  scoreModalEl.style.display="none";
});

// random word API

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

// random definition at footer API 

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





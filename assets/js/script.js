// Global
const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const wordIs = 'EASY'

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
}

// Assigns onscreen keyboard push down event.
const addLetter = (letter) => {
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
const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    // Adds comment for finding the correct word.
    if (currentTile > 3) {       
        console.log('What is the word? ' + guess, 'The word is ' + wordIs)
        flipTile()
        if (wordIs === guess) {
            showMessage('That is the word!')
            isGameOver = true
            return
            // Adds comment for not finding correct word after 6 attempts
        } else {
            if (currentRow >= 5) {
                isGameOver = false
                showMessage('Game Over')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }
    }
}

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
var timeEl = document.querySelector("#timer");
var secondsLeft = 5;
var timeModalEl = document.getElementById("time-modal")
var modalCloseEl = document.querySelector(".modal-close");

function showTimeModal() {
  timeModalEl.style.display="block";
};

modalCloseEl.addEventListener ('click',function() {
  timeModalEl.style.display="none";
});

function setTime() {
    var timerInterval = setInterval(function() { 
      secondsLeft--; 
      timeEl.textContent = "Time left: " + secondsLeft + " s";
  
      if(secondsLeft === 0) { 
        clearInterval(timerInterval);
        showTimeModal();
      };
  
    }, 1000); 
  };

 setTime();

 // High Score modal 

 var scoreModalEl = document.getElementById("highscore-modal");
 var scoreCloseEl = document.querySelector(".score-modal-close");
 var scoreButtonEl = document.getElementById("highscore");

 scoreButtonEl.addEventListener ('click',function() {
  scoreModalEl.style.display="block";
});

scoreCloseEl.addEventListener('click',function() {
  scoreModalEl.style.display="none";
});
  
// First API

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b22145e873msh4d82e3e45ad2014p12d599jsn603c1467e9bb',
		'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
	}
};

fetch('https://random-words5.p.rapidapi.com/getMultipleRandom?count=20&wordLength=4', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
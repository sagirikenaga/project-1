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

let currentRow = 0
let currentTile = 0

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

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
});

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

const addLetter = (letter) => {
    if (currentTile < 4 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++ 
    }
}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')

    if (currentTile === 4) {       
        console.log('What is the word? ' + guess, 'The word is ' + wordIs)
        if (wordIs === guess) {
            showMessage('That is the word!')
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

//timer
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

 //high score modal 

 var scoreModalEl = document.getElementById("highscore-modal");
 var scoreCloseEl = document.querySelector(".score-modal-close");
 var scoreButtonEl = document.getElementById("highscore");

 scoreButtonEl.addEventListener ('click',function() {
  scoreModalEl.style.display="block";
});

scoreCloseEl.addEventListener('click',function() {
  scoreModalEl.style.display="none";
});
  
// first API

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
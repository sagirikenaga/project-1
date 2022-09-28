const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')

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

//timer
var timeEl = document.querySelector("#timer");
var secondsLeft = 60;
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
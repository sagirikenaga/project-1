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

keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
}) 



//timer
var timeEl = document.querySelector("#timer");
var secondsLeft = 60;

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() { 
      secondsLeft--; 
      timeEl.textContent = "Time left: " + secondsLeft + " s";
  
      if(secondsLeft === 0) { 
        clearInterval(timerInterval);
        sendMessage();
      }
  
    }, 1000); 
  }

  function sendMessage() {
    timeEl.textContent = " "; 
    var timeUpEl = document.querySelector(".message-container");
    timeUpEl.textContent("Time's up! Try again.") 
  
  }
  
  setTime();
  
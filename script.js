import { words } from "./words.js"

function generateRandomWord(words, wordLength){
    let filteredWords = words.filter(word=>word.length==wordLength);
    let wordIndex = Math.floor((Math.random() * filteredWords.length));
    return filteredWords[wordIndex];
}

function compareWords(actualWord, guessWord){
    let result = {};
    let actualWordSet = new Set(actualWord);
    for(let i = 0; i<actualWord.length; i++){
        if(actualWord.charAt(i)==guessWord.charAt(i)) result[guessWord.charAt(i)] = 1
        else if(actualWordSet.has(guessWord.charAt(i))) result[guessWord.charAt(i)] = 0
        else result[guessWord.charAt(i)] = -1
    }
    return result;
}

function checkValidity(actualWord, guessWord){
    return actualWord.length==guessWord.length;
}

function cliGame(){
    let wordLength=5;
    let actualWord = generateRandomWord(words, wordLength);
    console.log(actualWord);
    let roundIndex = 0;
    let finalResult = false;

    while (roundIndex<6){
        console.log(`Round ${roundIndex+1}`);
        let guessWord = window.prompt('Enter Guess: ');
        console.log(`your guess: ${guessWord}`)
        if(!checkValidity(actualWord, guessWord)){
            console.log('invalid length!');
            continue
        }
        if(actualWord==guessWord){
            console.log('correct !!');
            finalResult = true;
            break;
        }
        let roundResult = compareWords(actualWord, guessWord);
        console.log(roundResult);
        roundIndex+=1;
    }

    if(finalResult) console.log('game over, you win');
    else console.log('game over, you lose');
}

function playOneRound(guessWord){
    if(roundIndex==NUM_ROUNDS) return;
    
    guessWord = guessWord.toLowerCase();
    
    if(!checkValidity(actualWord, guessWord)){
        alert('invalid length!');
        return;
    }
    
    let actualWordSet = new Set(actualWord);
    
    for(let i = 0; i<actualWord.length; i++){
        let currDiv = actualGrid[roundIndex][i];
        currDiv.textContent = guessWord.charAt(i);
        if(actualWord.charAt(i)==guessWord.charAt(i)) currDiv.classList.add('letter-correct');
        else if(actualWordSet.has(guessWord.charAt(i)))currDiv.classList.add('letter-exists');
        else currDiv.classList.add('letter-incorrect');
    }
    
    roundIndex++;

    if(actualWord==guessWord) document.querySelector('.fina-result').textContent=`Game over, you win. Refresh page to play again`;
    else if(roundIndex==NUM_ROUNDS) document.querySelector('.final-result').textContent=`Game over, you lose. Actual Word: ${actualWord}. Refresh page to play again`;
}

function onSubmit(event){
    let input = document.querySelector('#input-guess');
    playOneRound(input.value);
    input.value = '';
}

function createGridCell(cell_width, cell_height){
    const grid_cell = document.createElement('div');
    
    grid_cell.classList.add('grid-cell');
    
    grid_cell.style.width = cell_width+'px';
    grid_cell.style.height = cell_height+'px';

    return grid_cell
}

function createGrid(grid_container, m, n){
    const actualGrid = Array.from(Array(m), () => new Array(n));
    const cell_height = grid_container.clientHeight/m;
    const cell_width = grid_container.clientWidth/n;
    for(let i=0;i<m;i++){
        for(let j=0;j<n;j++){
            let gridCell = createGridCell(cell_width, cell_height);
            grid_container.appendChild(gridCell);
            actualGrid[i][j] = gridCell;
        }
    }
    return actualGrid;
}

let WORD_LENGTH=5;
let actualWord = generateRandomWord(words, WORD_LENGTH);
const NUM_ROUNDS = 6;
let roundIndex = 0;

let input = document.querySelector('#input-guess');
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("submit-button").click();
  }
});

let submitButton = document.querySelector('#submit-button');
submitButton.addEventListener('click', onSubmit);

const grid_container = document.querySelector('.grid-container');
const actualGrid = createGrid(grid_container, NUM_ROUNDS, WORD_LENGTH);
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

cliGame();
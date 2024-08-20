const answerKey = [];
let guessCounter = 0;
let guessHistory = "";
const userGuess = [];
let userGuessLength = 0;


function initRandomList(){
    const numberList = [0, 1, 2, 3, 4, 5];
    for (let i = 0; i < 4; i++){
        index = Math.floor(Math.random()*numberList.length);
        answerKey[i] = numberList[index];
        numberList.splice(index, 1);
    }
    return true;
}

//check if guess is 'valid', no invalid items
function validGuess(userGuess){
    if (userGuess.length != 4){
        return False;
    }

    for (let i = 0; o < userGuess.length; i++){
        if (userGuess[i] < 0 || userGuess[i] >= 6){
            return False;
        }
    }

    return True;
}

function analyzeKey(userInput, answerKey){
    //console.log("INSIDE ANALYZEKEY FUNCTION");
    numRight = 0; //correct colour in correct position
    const colorTracker = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < answerKey.length; i++){
        colorTracker[answerKey[i]] ++;
        numRight += (userInput[i] == answerKey[i]);
    }

    numClose = numRight*-1

    for (let i = 0; i < userInput.length; i++){
        if (colorTracker[userInput[i]] != 0){
            numClose += 1;
            colorTracker[userInput[i]] -= 1;
        }
    }

    return [numRight, numClose];
}


//temporary function used to separate input
function tempSeparateInput(){
    let rawInput = document.getElementById('number1').value;
    const separatedInput = [];
    for (let i = 0; i < rawInput.length; i++){
        separatedInput[i] = Number(rawInput[i]);
    }
    return separatedInput;
}

function tempToggleAnswer(){
    if (document.getElementById('answer').innerHTML == ""){
        document.getElementById('answer').innerHTML = answerKey;
        displayAnswer()
    } else {
        document.getElementById('answer').innerHTML = "";
        hideAnswer()
    }
}

function displayAnswer(){
    document.getElementById("answer-label").style.display = "Block"
    for (let i = 0; i < answerKey.length; i++){
        let imageId = "circle" + answerKey[i];
        let image = document.getElementById(imageId);
        let container = document.getElementById('answer-container')
        let currentImages = Array.from(container.children);
        container.insertBefore(image, currentImages[i+1])
        image.style.display="Inline";
    }
}

function hideAnswer(){
    document.getElementById("answer-label").style.display = "none";
    elements = document.getElementsByClassName("circle-icon");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.display = "none";
    }
}

function winDisplay(){
    document.getElementById('result').innerHTML = "YOU WON!"
    document.getElementById('answer').innerHTML = "ANSWER: " + answerKey;
    document.getElementById('start').innerHTML = "START"
}

function loseDisplay(){
    document.getElementById('result').innerHTML = "YOU LOST!"
    document.getElementById('answer').innerHTML = "ANSWER: " + answerKey;
    document.getElementById('start').innerHTML = "TRY AGAIN"
}



function getInput(num){
    if (num == 6){
        elements = document.getElementById("input-display").children;
        for (let i = elements.length - 1; i >= 0; i--){
            elements[i].remove();
            userGuessLength = 0;
        }
    } else if (document.getElementById("input-display").children.length < 4){
        let newImage = document.createElement('img');
        srcName = "images/circle" + num + ".png";
        console.log(srcName);
        newImage.src = srcName;
        newImage.width = 24;
        document.getElementById("input-display").appendChild(newImage);
        userGuess[userGuessLength] = num;
        userGuessLength ++;
    }
}

function newGame(){
    initRandomList()
    document.getElementById('feedback').innerHTML = "Correct color correct spot: -";
    document.getElementById('feedback2').innerHTML = "Correct color wrong spot: -";
    document.getElementById('count').innerHTML = "Number of guesses: 0";
    document.getElementById('result').innerHTML = "";
    document.getElementById('answer').innerHTML = "";
    document.getElementById('history').innerHTML = "";
    document.getElementById('start').innerHTML = "RESTART"
    guessCounter = 0;

    elements = document.getElementsByClassName("content");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.display = "block";
    }
    hideAnswer()
    
    if (document.getElementById('history-container').hasChildNodes()){
        let elements = document.getElementById('history-container').children;
        let length = elements.length;
        console.log(length);
        for (let x = 0; x < length; x++){
            elements[0].remove();
        }
    }

    document.getElementById('input-container').style.display = "block";
}

function makeGuess(){
    if (userGuessLength == 4){
        //validInput = false;
        //const userInput = tempSeparateInput();
        //console.log(userInput);
        //document.getElementById('userguess').innerHTML = userInput;
        const result = analyzeKey(userGuess, answerKey);
        //console.log(answerKey);
        document.getElementById('feedback').innerHTML = "Correct color correct spot: " + result[0];
        document.getElementById('feedback2').innerHTML = "Correct color wrong spot: " + result[1];
        guessCounter += 1;
        document.getElementById('count').innerHTML = "Number of guesses: " + guessCounter;
        guessHistory += (userGuess + ";" + result + " - ");
        document.getElementById('history').innerHTML = guessHistory;
        if (result[0] == 4){
            winDisplay();
        } else if (guessCounter >= 10){
            loseDisplay();
        }

        let container = document.getElementById('input-display').children;
        let tempContainer = document.createElement('div');
        for (let i = 0; i < 4; i++){
            tempContainer.appendChild(container[0]);
        }

        let correctPosition = document.createElement('p');
        let correctColor = document.createElement('p');
        correctPosition.innerHTML = "Correct Spot: " + result[0];
        correctColor.innerHTML = "Correct Color: " + result[1];

        tempContainer.appendChild(correctPosition);
        tempContainer.appendChild(correctColor);
        tempContainer.style.display = "Inline-block";
        tempContainer.style.margin = "10px";

        document.getElementById("history-container").appendChild(tempContainer);
        userGuessLength = 0;
        
    } else {
        window.alert("Error: invalid input");
    }
}

/**function tempShow(){
    //console.log(document.getElementsByClassName("content"));
    elements = document.getElementsByClassName("content");
    for (let i = 0; i < elements.length; i++){
        elements[i].style.display = "block";
    }
}**/


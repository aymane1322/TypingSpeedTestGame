"use strict";
const level = document.getElementById("level"), seconds = document.getElementById("seconds"), button = document.querySelector("button"), theWord = document.querySelector(".typeTheWord"), input = document.querySelector("input"), nextWordsDiv = document.querySelector(".words"), timeLeft = document.getElementById("timeLeft"), score = document.getElementById("score"), maxScore = document.getElementById("maxScore"), generaleTime = document.querySelector(".time"), container = document.querySelector(".container"), youWin = document.querySelector(".youWin"), youLose = document.querySelector(".youLose"), tryAgainLose = document.querySelector(".tryAgain2"), tryAgainWin = document.querySelector(".tryAgain1"), winTime = document.getElementById("winTime"), winRate = document.getElementById("winRate"), loseTime = document.getElementById("loseTime"), loseRate = document.getElementById("loseRate"), reachedWord = document.getElementById("reachedWord");
let randomNumberVlue = randomNumber();
const Words = [[
        "apple", "banana", "chocolate", "dog", "elephant", "flower", "guitar", "happiness", "island", "jazz",
        "kangaroo", "lemon", "mountain", "noodle", "ocean", "penguin", "quilt", "rainbow", "sunshine", "tiger"
    ],
    [
        "umbrella", "volcano", "waterfall", "xylophone", "yacht", "zebra", "astronomy", "butterfly", "candle",
        "dolphin", "eagle", "firework", "giraffe", "hurricane", "icecream", "jellyfish", "koala", "lighthouse",
        "mango", "nightingale"
    ],
    [
        "octopus", "parrot", "quokka", "rainforest", "seahorse", "toucan", "unicorn", "violin", "whale", "x-ray",
        "yogurt", "zeppelin", "avocado", "beach", "cactus", "dandelion", "elephant", "forest", "gazelle", "hedgehog"
    ],
    [
        "igloo", "jackal", "kite", "leopard", "mushroom", "narwhal", "octopus", "panda", "quail", "raccoon",
        "sunflower", "tiger", "urchin", "vampire", "wombat", "xenophobia", "yak", "zeppelin", "acoustic", "bicycle"
    ],
    [
        "carousel", "dinosaur", "elephant", "flamingo", "giraffe", "helicopter", "iguana", "jellybean",
        "kangaroo", "lemur", "marmalade", "narwhal", "opera", "piano", "quicksilver", "rhinoceros", "saxophone",
        "trampoline", "umbrella", "victory"
    ]], randomWords = randomWordsArray(Words[randomNumberVlue]);
let levelNumber = 0, gSeconds = 0, gMenutes = 0, time = 4, currentWod = 0, scoreNumber = 0, countDonwIntervalID, generalTimeIntervalID;
level.innerHTML = '&nbsp;' + String(levelNumber) + '&nbsp;';
seconds.innerHTML = '&nbsp;' + String(time) + '&nbsp;' + 'Seconds' + '&nbsp;';
level.style.color = "blue";
seconds.style.color = "red";
timeLeft.style.color = "red";
theWord.innerHTML = randomWords[currentWod];
maxScore.innerHTML = `${randomWordsArray(Words[randomNumberVlue]).length}`;
for (let key in Words[randomNumberVlue]) {
    const span = document.createElement("span");
    const spanText = document.createTextNode(`${Words[randomNumberVlue][key]}`);
    span.appendChild(spanText);
    nextWordsDiv.appendChild(span);
}
button.addEventListener("click", () => {
    input.style.display = "flex";
    theWord.style.display = "block";
    input.focus();
    button.remove();
    generalTime();
    countDown(time);
    input.addEventListener("keyup", () => {
        if (input.value.toLowerCase() === randomWords[currentWod].toLowerCase()) {
            if (currentWod < randomWords.length - 1) {
                input.value = '';
                currentWod++;
                theWord.innerHTML = randomWords[currentWod];
                levelNumber++;
                scoreNumber++;
                stopCountDwon();
                countDown(time);
                score.innerHTML = `${scoreNumber}`;
                level.innerHTML = '&nbsp;' + String(levelNumber) + '&nbsp;';
            }
            else {
                clearInterval(generalTimeIntervalID);
                levelNumber++;
                scoreNumber++;
                score.innerHTML = `${scoreNumber}`;
                level.innerHTML = '&nbsp;' + String(levelNumber) + '&nbsp;';
                stopCountDwon();
                container.style.display = "none";
                winTime.innerHTML = `00:${String(gSeconds).padStart(2, '0')}`;
                winRate.innerHTML = `${String(rate(gSeconds))}/100`;
                youWin.style.display = "flex";
            }
        }
    });
});
function randomWordsArray(array) {
    let result = [];
    let emptyArray = [...Array(array.length).keys()];
    let temp;
    for (let key in emptyArray) {
        let randomNumber = Math.floor(Math.random() * emptyArray.length);
        temp = emptyArray[key];
        emptyArray[key] = emptyArray[randomNumber];
        emptyArray[randomNumber] = temp;
    }
    for (let key in emptyArray) {
        result.push(array[emptyArray[key]]);
    }
    return result;
}
function generalTime() {
    generalTimeIntervalID = setInterval(() => {
        gSeconds++;
        if (gSeconds === 60) {
            gSeconds = 0;
            gMenutes++;
        }
        generaleTime.innerHTML = `Time  ${String(gMenutes).padStart(2, '0')}:${String(gSeconds).padStart(2, '0')}`;
    }, 1000);
}
function countDown(amount) {
    let timer = amount;
    countDonwIntervalID = setInterval(() => {
        timeLeft.innerHTML = `${timer - 1} Seconds`;
        gameOver(parseInt(timeLeft.innerHTML));
        timer--;
        if (timer <= 0) {
            clearInterval(countDonwIntervalID);
        }
    }, 1000);
}
function stopCountDwon() {
    clearInterval(countDonwIntervalID);
}
function gameOver(time) {
    if (time === 0) {
        clearInterval(generalTimeIntervalID);
        container.style.display = "none";
        youLose.style.display = "flex";
        loseTime.innerHTML = `00:${String(gSeconds).padStart(2, '0')}`;
        loseRate.innerHTML = `${String(rate(gSeconds, scoreNumber))}/100`;
        reachedWord.innerHTML = `${scoreNumber} from ${randomWordsArray(Words[randomNumberVlue]).length} words`;
    }
}
function tryAgainF() {
    tryAgainLose.addEventListener("click", () => {
        resetGame();
    });
    tryAgainWin.addEventListener("click", () => {
        resetGame();
    });
}
tryAgainF();
function resetGame() {
    window.location.reload();
}
function rate(value, score) {
    const lowest = 1.5 * randomWordsArray(Words[randomNumberVlue]).length;
    const highest = time * randomWordsArray(Words[randomNumberVlue]).length;
    if (score !== undefined) {
        if (score >= 0 && score <= 10) {
            return score * 1.25;
        }
        else if (score > 10 && score <= 19) {
            return score * 2.5;
        }
    }
    if (value < lowest) {
        return 100;
    }
    if (value >= highest) {
        return 0;
    }
    let result = 100 - ((value - lowest) / (highest - lowest)) * 100;
    return result;
}
function randomNumber() {
    let emptyArray = [...Array(5).keys()];
    let temp;
    for (let key in emptyArray) {
        let randomNumber = Math.floor(Math.random() * emptyArray.length);
        temp = emptyArray[key];
        emptyArray[key] = emptyArray[randomNumber];
        emptyArray[randomNumber] = temp;
    }
    return emptyArray[0];
}
input.addEventListener("paste", (e) => {
    e.preventDefault();
});
//# sourceMappingURL=index.js.map
//HTML Elementes Variables :
const level = document.getElementById("level") as HTMLSpanElement,
    seconds = document.getElementById("seconds") as HTMLSpanElement,
    button = document.querySelector("button") as HTMLButtonElement,
    theWord = document.querySelector(".typeTheWord") as HTMLParagraphElement,
    input = document.querySelector("input") as HTMLInputElement,
    nextWordsDiv = document.querySelector(".words") as HTMLDivElement,
    timeLeft = document.getElementById("timeLeft") as HTMLSpanElement,
    score = document.getElementById("score") as HTMLSpanElement,
    maxScore = document.getElementById("maxScore") as HTMLSpanElement,
    generaleTime = document.querySelector(".time") as HTMLSpanElement,
    container = document.querySelector(".container") as HTMLDivElement,
    youWin = document.querySelector(".youWin") as HTMLDivElement,
    youLose = document.querySelector(".youLose") as HTMLDivElement,
    tryAgainLose = document.querySelector(".tryAgain2") as HTMLDivElement,
    tryAgainWin = document.querySelector(".tryAgain1") as HTMLDivElement,
    winTime = document.getElementById("winTime") as HTMLSpanElement,
    winRate = document.getElementById("winRate") as HTMLSpanElement,
    loseTime = document.getElementById("loseTime") as HTMLSpanElement,
    loseRate = document.getElementById("loseRate") as HTMLSpanElement,
    reachedWord = document.getElementById("reachedWord") as HTMLSpanElement;
    
//Configuration Variables :
let randomNumberVlue: number = randomNumber();
const Words: string[][] = [ [
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
]],
    randomWords: string[] = randomWordsArray(Words[randomNumberVlue]);
let levelNumber: number = 0,
    gSeconds: number = 0,
    gMenutes: number = 0,
    time: number = 4,
    currentWod: number = 0,
    scoreNumber: number = 0,
    countDonwIntervalID: number,
    generalTimeIntervalID: number;
    
//First Text display :
level.innerHTML = '&nbsp;' + String(levelNumber) + '&nbsp;';
seconds.innerHTML = '&nbsp;' + String(time) + '&nbsp;'+'Seconds'+'&nbsp;';
level.style.color = "blue";
seconds.style.color = "red";
timeLeft.style.color = "red";
//the first random word show :
theWord.innerHTML = randomWords[currentWod];
//maxScore :
maxScore.innerHTML=`${randomWordsArray(Words[randomNumberVlue]).length}`
//Possible Word spans:
for (let key in Words[randomNumberVlue]) {
    const span = document.createElement("span");
    const spanText = document.createTextNode(`${Words[randomNumberVlue][key]}`);
    span.appendChild(spanText);
    nextWordsDiv.appendChild(span);
}
//Play Now! logique :
button.addEventListener("click", () => {
    input.style.display = "flex";
    theWord.style.display = "block";
    input.focus();
    button.remove();
    generalTime();
    countDown(time);
    input.addEventListener("keyup", () => {
        if (input.value === randomWords[currentWod]) {
            if (currentWod < randomWords.length-1) {
                input.value = '';
                currentWod++;
                theWord.innerHTML = randomWords[currentWod];
                levelNumber++;
                scoreNumber++;
                stopCountDwon();
                countDown(time);
                score.innerHTML = `${scoreNumber}`;
                level.innerHTML = '&nbsp;' + String(levelNumber) + '&nbsp;';
            } else {// You Win :
                clearInterval(generalTimeIntervalID);
                levelNumber++;
                scoreNumber++;
                score.innerHTML = `${scoreNumber}`;
                level.innerHTML = '&nbsp;' + String(levelNumber) + '&nbsp;';
                stopCountDwon();
                container.style.display = "none";
                winTime.innerHTML = `00:${String(gSeconds).padStart(2,'0')}`;
                winRate.innerHTML = `${String(rate(gSeconds))}/100`;
                youWin.style.display = "flex";
            }
        }
    })
})
//functons :
function randomWordsArray(array: string[]):string[] {
    let result: string[]=[];
    let emptyArray:number[] = [...Array(array.length).keys()];
    let temp:number
    for (let key in emptyArray) {
        let randomNumber = Math.floor(Math.random() * emptyArray.length);
        temp = emptyArray[key];
        emptyArray[key] = emptyArray[randomNumber];
        emptyArray[randomNumber] = temp;
    }
    for (let key in emptyArray) {
        result.push(array[emptyArray[key]])
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
    }, 1000)
}
function countDown(amount: number) {
    let timer = amount
    countDonwIntervalID = setInterval(() => {
        timeLeft.innerHTML = `${timer - 1} Seconds`;
        gameOver(parseInt(timeLeft.innerHTML));
        timer--;
        if (timer <= 0) {
            clearInterval(countDonwIntervalID);
        }
    }, 1000)
}
function stopCountDwon() {
    clearInterval(countDonwIntervalID);
}
function gameOver(time: number) {// You LOse :
    if (time === 0) {
        clearInterval(generalTimeIntervalID);
        container.style.display="none";
        youLose.style.display = "flex";
        loseTime.innerHTML = `00:${String(gSeconds).padStart(2,'0')}`;
        loseRate.innerHTML = `${String(rate(gSeconds,scoreNumber))}/100`;
        reachedWord.innerHTML = `${scoreNumber} from ${randomWordsArray(Words[randomNumberVlue]).length} words`;
    }
}
//Try Again Function :
function tryAgainF() {
    tryAgainLose.addEventListener("click", () => {
        resetGame()
    })
    tryAgainWin.addEventListener("click", () => {
        resetGame()
    })
}
tryAgainF();
function resetGame() {
    window.location.reload(); //Change it for a better user experience
}
function rate(value: number,score?:number): number {
    const lowest: number = 1.5 * randomWordsArray(Words[randomNumberVlue]).length;
    const highest: number = time * randomWordsArray(Words[randomNumberVlue]).length;
    if (score !== undefined) {
        if (score >= 0 && score <= 10) {
            return score*1.25
        } else if (score >10 && score <= 19) {
            return score*2.5
        }
    }
    if (value < lowest) {
        return 100;
    }
    if (value >= highest) {
        return 0;
    }
    let result: number = 100 - ((value - lowest) / (highest - lowest)) * 100;
    return result;
}
function randomNumber():number {
    let emptyArray:number[] = [...Array(5).keys()];
    let temp:number
    for (let key in emptyArray) {
        let randomNumber = Math.floor(Math.random() * emptyArray.length);
        temp = emptyArray[key];
        emptyArray[key] = emptyArray[randomNumber];
        emptyArray[randomNumber] = temp;
    }
    return emptyArray[0];
}

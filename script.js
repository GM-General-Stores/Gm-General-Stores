const words = [
    { word: "Touchpad", time: 10 },
    { word: "Trackball", time: 10 },
    { word: "Joystick", time: 10 },
    { word: "Webcam", time: 10 },
    { word: "Microphone", time: 12 },
    { word: "Headphones", time: 12 },
    { word: "Speakers", time: 10 },
    { word: "Projector", time: 12 },
    { word: "DVD Drive", time: 12 },
    { word: "Blu-ray Drive", time: 15 },
    { word: "Flash Drive", time: 10 },
    { word: "SSD", time: 10 },
    { word: "HDD", time: 10 },
    { word: "Backspace", time: 12 },
    { word: "Power Supply", time: 15 },
    { word: "Cooling Fan", time: 10 },
    { word: "Heat Sink", time: 10 },
    { word: "Case", time: 10 },
    { word: "BIOS", time: 10 },
    { word: "Hacker", time: 12 },
    { word: "Expansion Card", time: 12 },
    { word: "MacOS", time: 10 },
    { word: "Windows", time: 10 },
    { word: "Linux", time: 10 },
    { word: "Microsoft", time: 12 },
    { word: "PowerPoint", time: 12 },
    { word: "Ethernet Port", time: 10 },
    { word: "HDMI Port", time: 10 },
    { word: "VGA Port", time: 10 },
    { word: "CapsLock", time: 10 },
        { word: "CPU", time: 10 },
        { word: "Motherboard", time: 15 },
        { word: "RAM", time: 10 },
        { word: "Hard Drive", time: 12 },
        { word: "Monitor", time: 12 },
        { word: "Keyboard", time: 10 },
        { word: "Mouse", time: 10 },
        { word: "Graphics Card", time: 15 },
        { word: "Software", time: 10 },
        { word: "System Unit", time: 15 },
        { word: "Microsoft Excel", time: 15 },
        { word: "Network", time: 12 },
        { word: "Printer", time: 10 },
        { word: "Scanner", time: 10 },
        { word: "USB", time: 10 },
        { word: "Operating System", time: 15 },
        { word: "Internet", time: 10 },
        { word: "Router", time: 10 },
        { word: "Firewall", time: 12 },
        { word: "Antivirus", time: 12 },
        { word: "Backup", time: 10 },
        { word: "Cloud Storage", time: 15 },
        { word: "Database", time: 12 },
        { word: "Encryption", time: 12 },
        { word: "Ethernet", time: 10 },
        { word: "Application", time: 12 },
        { word: "Data", time: 10 },
        { word: "Information", time: 10 },
        { word: "Computer", time: 10 },
        { word: "Robot", time: 12 },
        { word: "Binary", time: 10 },
        { word: "Compiler", time: 12 },
        { word: "Debugger", time: 12 },
        { word: "Hardware", time: 10 },
        { word: "Laptop", time: 10 },
        { word: "Server", time: 10 },
{ word: "E-book", time: 10 },
{ word: "Wi-Fi", time: 10 },
{ word: "Smartphone", time: 10 },
{ word: "Tablet", time: 10 },
{ word: "E-learning", time: 12 },
{ word: "Device", time: 12 },
{ word: "Coding", time: 10 },
{ word: "Windows", time: 10 },
{ word: "Gaming", time: 10 },
{ word: "Virtual Reality", time: 15 },
{ word: "Augmented Reality", time: 15 },
{ word: "Electronic", time: 12 },
{ word: "Online Safety", time: 12 },
{ word: "Cyberbullying", time: 12 },
{ word: "Internet Safety", time: 12 },
{ word: "Web Browser", time: 10 },
{ word: "Social Media", time: 10 },
{ word: "Digital", time: 12 },
{ word: "Password", time: 12 }     
];

let selectedWords = [];
let currentWordIndex = 0;
let score = 0;
let timeLeft;
let timerInterval;
const maxScore = 100;
const wordDisplay = document.getElementById("word-display");
const inputBox = document.getElementById("input-box");
const scoreDisplay = document.getElementById("score-display");
const wordsRemainingDisplay = document.getElementById("words-remaining");
const fallingScore = document.getElementById("falling-score");
const modal = document.getElementById("modal");
const finalScore = document.getElementById("final-score");
const timerDisplay = document.getElementById("timer");
const instructionModal = document.getElementById("instruction-modal");
const startGameButton = document.getElementById("start-game-button");

startGameButton.addEventListener('click', startGame);

function getRandomWords() {
    const shuffled = words.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
}

function displayWord() {
    const currentWordObj = selectedWords[currentWordIndex];
    wordDisplay.innerHTML = currentWordObj.word.split('').map(letter => `<span>${letter}</span>`).join('');
    inputBox.value = "";
    inputBox.focus();
    timeLeft = currentWordObj.time;
    resetTimer();
    startTimer();
    wordsRemainingDisplay.innerHTML = `Words remaining: ${selectedWords.length - currentWordIndex - 1}`;
}

function highlightLetter(correctCount) {
    const spans = wordDisplay.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (index < correctCount) {
            span.classList.add('correct');
        } else {
            span.classList.remove('correct');
        }
    });
}

function startTimer() {
    timerDisplay.innerHTML = `⏰ TIME LEFT: ${timeLeft}s ⏰`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerHTML = `⏰ TIME LEFT: ${timeLeft}s ⏰`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            currentWordIndex++;
            if (currentWordIndex < selectedWords.length) {
                displayWord();
            } else {
                showFinalScore();
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
}

inputBox.addEventListener('input', () => {
    const typedValue = inputBox.value;
    const currentWord = selectedWords[currentWordIndex].word;

    if (typedValue === currentWord) {
        score += 10;
        scoreDisplay.innerHTML = `Score: ${score}`;
        highlightCorrectLetters(typedValue, currentWord); // Highlight the final letter
        setTimeout(() => {
            showFallingScore();
            currentWordIndex++;
            if (currentWordIndex < selectedWords.length) {
                displayWord();
            } else {
                showFinalScore();
            }
        }, 300); // Delay to show the highlight
    } else {
        highlightCorrectLetters(typedValue, currentWord);
    }
});

function highlightCorrectLetters(typedValue, currentWord) {
    const spans = wordDisplay.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (typedValue[index] && typedValue[index] === currentWord[index]) {
            span.classList.add('correct');
        } else {
            span.classList.remove('correct');
        }
    });
}

function showFallingScore() {
    fallingScore.style.display = "block";
    setTimeout(() => {
        fallingScore.style.display = "none";
    }, 2000);
}

function showFinalScore() {
    modal.style.display = "flex";
    finalScore.innerHTML = `Your final score is ${score} out of ${maxScore}.`;
}

function closeModal() {
    modal.style.display = "none";
}

function resetGame() {
    modal.style.display = "none";
    selectedWords = getRandomWords();
    currentWordIndex = 0;
    score = 0;
    scoreDisplay.innerHTML = `Score: ${score}`;
    displayWord();
}

function startGame() {
    instructionModal.style.display = "none";
    selectedWords = getRandomWords();
    displayWord();
}

document.addEventListener('DOMContentLoaded', () => {
    instructionModal.style.display = "flex";
});

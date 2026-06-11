let randomNumber;
let attempts = 0;

const guessInput = document.getElementById('guessInput');
const message = document.getElementById('message');
const attemptsLabel = document.getElementById('attempts');
const winnerMessage = document.getElementById('winnerMessage');
const guessHistory = document.getElementById('guessHistory');
const submitGuessButton = document.getElementById('submitGuess');
const playAgainButton = document.getElementById('playAgain');

function setGameDisabled(isDisabled) {
    guessInput.disabled = isDisabled;
    submitGuessButton.disabled = isDisabled;
}

function addGuessCard(guess, resultText, resultType) {
    const guessCard = document.createElement('div');
    guessCard.className = `guess-card guess-card--${resultType}`;
    guessCard.textContent = `Attempt ${attempts}: ${guess} - ${resultText}`;
    guessHistory.prepend(guessCard);
}

function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessInput.value = '';
    message.textContent = 'Guess a number between 1 and 100';
    attemptsLabel.textContent = 'Attempts: 0';
    winnerMessage.hidden = true;
    winnerMessage.textContent = '';
    guessHistory.innerHTML = '';
    playAgainButton.hidden = true;
    setGameDisabled(false);
}

function processGuess() {
    const userGuess = Number(guessInput.value);

    if (!Number.isInteger(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    attempts++;
    attemptsLabel.textContent = `Attempts: ${attempts}`;

    guessInput.value = '';

    if (userGuess === randomNumber) {
        message.textContent = 'Correct guess!';
        winnerMessage.textContent = `Congratulations! You found ${randomNumber} in ${attempts} attempts.`;
        winnerMessage.hidden = false;
        addGuessCard(userGuess, 'Correct!', 'correct');
        setGameDisabled(true);
        playAgainButton.hidden = false;
    } else if (userGuess < randomNumber) {
        message.textContent = 'Too low! Try again.';
        addGuessCard(userGuess, 'Too low', 'low');
    } else if (userGuess > randomNumber) {
        message.textContent = 'Too high! Try again.';
        addGuessCard(userGuess, 'Too high', 'high');
    }
}

submitGuessButton.addEventListener('click', processGuess);
guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        processGuess();
    }
});
playAgainButton.addEventListener('click', startGame);

window.onload = startGame;
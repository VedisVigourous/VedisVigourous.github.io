// Initialize the game variables
let randomNumber;
let attempts = 0;

// Function to start a new game
function startGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guessInput').value = '';
    document.getElementById('message').textContent = 'Guess a number between 1 and 100';
    document.getElementById('attempts').textContent = 'Attempts: 0';
}

// Function to process the user's guess
function processGuess() {
    const userGuess = Number(document.getElementById('guessInput').value);

    if (!Number.isInteger(userGuess) || userGuess < 1 || userGuess > 100) {
        document.getElementById('message').textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    attempts++;
    document.getElementById('attempts').textContent = `Attempts: ${attempts}`;

    if (userGuess === randomNumber) {
        document.getElementById('message').textContent = `Congratulations! You've guessed the number ${randomNumber} in ${attempts} attempts.`;
    } else if (userGuess < randomNumber) {
        document.getElementById('message').textContent = 'Too low! Try again.';
    } else if (userGuess > randomNumber) {
        document.getElementById('message').textContent = 'Too high! Try again.';
    }
}

// Event listeners for the button and input field
document.getElementById('submitGuess').addEventListener('click', processGuess);
document.getElementById('guessInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        processGuess();
    }
});

// Start the game when the page loads
window.onload = startGame;
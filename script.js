const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== '' || checkWinner()) {
        return;
    }

    makeMove(index, currentPlayer);
    
    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 10);
    } else if (gameState.every(cell => cell !== '')) {
        setTimeout(() => alert('It\'s a tie!'), 10);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            makeAIMove();
        }
    }
}

function makeMove(index, player) {
    gameState[index] = player;
    cells[index].textContent = player;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

function makeAIMove() {
    let availableCells = gameState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomIndex, currentPlayer);
    
    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 10);
    } else if (gameState.every(cell => cell !== '')) {
        setTimeout(() => alert('It\'s a tie!'), 10);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

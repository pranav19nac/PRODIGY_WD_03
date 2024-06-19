const board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameOver = false;

const playerTurn = document.getElementById('player-turn');
const cells = document.querySelectorAll('td');

initializeGame();

function initializeGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameOver = false;
    board.fill('');
    playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

function handleCellClick(index) {
    if (!gameActive || gameOver) return;
    if (board[index] === '') {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        if (checkWin()) {
            gameActive = false;
            gameOver = true;
            playerTurn.textContent = `Player ${currentPlayer} Wins!`;
        } else if (checkTie()) {
            gameActive = false;
            gameOver = true;
            playerTurn.textContent = "It's a tie!";
        } else {
            switchPlayer();
        }
    }
}

function checkWin() {
    // Check rows
    for (let i = 0; i < 9; i += 3) {
        if (board[i] !== '' && board[i] === board[i + 1] && board[i] === board[i + 2]) {
            return true;
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6]) {
            return true;
        }
    }
    // Check diagonals
    if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
        return true;
    }
    if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
        return true;
    }
    return false;
}

function checkTie() {
    return board.every(cell => cell !== '');
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});
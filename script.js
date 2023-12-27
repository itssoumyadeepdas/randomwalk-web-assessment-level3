document.addEventListener('DOMContentLoaded', () => {
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let playerXName = '';
    let playerOName = '';
    let playerXWins = 0;
    let playerOWins = 0;

    const playersInputX = document.getElementById('playerX');
    const playersInputO = document.getElementById('playerO');
    const startGameButton = document.getElementById('startGame');
    const boardElement = document.getElementById('board');
    const scorecardElement = document.getElementById('scorecard');
    const statusElement = document.getElementById('status');

    startGameButton.addEventListener('click', startGame);

    function startGame() {
        playerXName = playersInputX.value || 'Player X';
        playerOName = playersInputO.value || 'Player O';
        renderScorecard();
        renderBoard();
        renderStatus();
    }

    function renderScorecard() {
        scorecardElement.innerHTML = `<p>${playerXName}: ${playerXWins} wins</p><p>${playerOName}: ${playerOWins} wins</p>`;
    }

    function renderBoard() {
        boardElement.innerHTML = '';
        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.index = index;
            cellElement.addEventListener('click', handleCellClick);
            cellElement.textContent = cell;
            boardElement.appendChild(cellElement);
        });
    }

    function handleCellClick(event) {
        const clickedIndex = event.target.dataset.index;
        if (board[clickedIndex] === '' && !checkWinner() && !isBoardFull()) {
            board[clickedIndex] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                handleWin();
            } else if (isBoardFull()) {
                handleDraw();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                renderStatus();
            }
        }
    }

    function checkWinner() {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        return false;
    }

    function isBoardFull() {
        return !board.includes('');
    }

    function handleWin() {
        if (currentPlayer === 'X') {
            playerXWins++;
        } else {
            playerOWins++;
        }
        renderScorecard();
        renderStatus(`${currentPlayer === 'X' ? playerXName : playerOName} wins!`);
        resetGame();
    }

    function handleDraw() {
        renderStatus('It\'s a draw!');
        resetGame();
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        setTimeout(() => {
            renderBoard();
            renderStatus();
        }, 1000);
    }

    function renderStatus(text = '') {
        statusElement.textContent = text || `Current turn: ${currentPlayer === 'X' ? playerXName : playerOName}`;
    }
});

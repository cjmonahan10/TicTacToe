
// Player objects
const players = (function(){

    let players = [{name: "Player 1", value: 1}, {name: "Player 2", value: 2}];

    const getPlayer = (index) => players[index];

    return {getPlayer};
})();


// Gameboard object
const gameboard = (function () {

    let board = ["","","","","","","","",""];

    const getBoard = () => board;

    const changeCell = (index, player) => {
        if (board[index] === ""){
            board[index] = player;
        }
    }

    const reset = () => {
        board = ["","","","","","","","",""];
    }

    const getCellValue = (index) => board[index];

    return {getBoard, changeCell, reset, getCellValue};
})();

// Game Controller
const gameController = (function () {
    
    let haveWinner = "";

    const player1 = players.getPlayer(0);
    const player2 = players.getPlayer(1);

    let activePlayer = player1;

    const changePlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    }

    const playMove = (index) => {
        if (gameboard.getCellValue(index) === ""){
            gameboard.changeCell(index, activePlayer.value);
            checkWin();
            changePlayer();
        }
    }

    const checkWin = () => {
        const indices = [];
        let board = gameboard.getBoard();
        let idx = board.indexOf(activePlayer.value);
        while (idx !== -1) {
            indices.push(idx);
            idx = board.indexOf(activePlayer.value, idx + 1);
        }

        const winConditions = [
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        const arraySearch = (indices, condition) => {
            return condition.every(index => indices.includes(index));
        };

        winConditions.forEach((condition) => {
            if (arraySearch(indices, condition) === true){
                haveWinner = activePlayer.name;
            }
        });
    }

    const reset = () => {
        activePlayer = player1;
        haveWinner = "";
    }

    const getWinner = () => haveWinner;

    const getActivePlayer = () => activePlayer;

    return {playMove, reset, getWinner, getActivePlayer};
})();


// Screen Controller
const screenController = (function () {
    
    const playerTurn = document.querySelector(".turn");
    const cellContainer = document.querySelector(".container");

    const updateScreen = () => {

        cellContainer.textContent = "";

        playerTurn.textContent = `It's ${gameController.getActivePlayer().name}'s turn!`;

        const board = gameboard.getBoard();

        board.forEach((cell, index) => {

            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.index = index;
            
            if (cell === 1){
                cellButton.textContent = "X";
            } else if (cell === 2){
                cellButton.textContent = "O";
            }

            cellContainer.appendChild(cellButton);
        })
        endGame();
    };

    const endGame = () => {
        if(gameController.getWinner() !== ""){
            cellContainer.removeEventListener("click", clickHandler);
            playerTurn.textContent = `${gameController.getWinner()} wins!`;
        }
    }

    const clickHandler = (e) => {
        const selectedCell = e.target.dataset.index;

        console.log(selectedCell);
        if(!selectedCell) return;

        gameController.playMove(selectedCell);
        updateScreen();
    }

    const resetScreen = () => {
        gameController.reset();
        gameboard.reset();
        updateScreen();
        cellContainer.addEventListener("click", clickHandler);
    }

    cellContainer.addEventListener("click", clickHandler);
    document.querySelector(".reset").addEventListener("click", resetScreen);

    updateScreen();

    return {updateScreen};
})();






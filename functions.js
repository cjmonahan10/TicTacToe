
// Player objects
// const players = (function(){

//     let player1 = {name: "Player 1", value: 1};
//     let player2 = {name: "PLayer 2", value: 2};

//     const getName = ()
// })();


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
    
    let haveWinner = false;

    let players = [{name: "Player 1", value: 1}, {name: "Player 2", value: 2}];

    let activePlayer = players[0];

    const changePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const playMove = (index) => {
        if (gameboard.getCellValue(index) === ""){
            gameboard.changeCell(index, activePlayer.value);
            checkWin();
            console.log(haveWinner);
            changePlayer();
        }
    }

    const arraySearch = (indices, condition) => {
        return condition.every(index => indices.includes(index));
    };

    const checkWin = () => {
        const indices = [];
        let board = gameboard.getBoard();
        let idx = board.indexOf(activePlayer.value);
        while (idx !== -1) {
            indices.push(idx);
            idx = board.indexOf(activePlayer.value, idx + 1);
        }
        console.log(indices);

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

        winConditions.forEach((condition) => {
            if (arraySearch(indices, condition) === true){
                haveWinner = true;
            }
        });

    }

    return {
        playMove
    };
})();


// Screen Controller
const screenController = (function () {

})();






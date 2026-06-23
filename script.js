// Elements

const cells =
document.querySelectorAll(".cell");

const statusText =
document.getElementById("status");

const restartBtn =
document.getElementById("restartBtn");

const pvpBtn =
document.getElementById("pvpBtn");

const aiBtn =
document.getElementById("aiBtn");

const xScoreEl =
document.getElementById("xScore");

const oScoreEl =
document.getElementById("oScore");

// Variables

let currentPlayer = "X";

let gameActive = true;

let gameMode = "pvp";

let xScore = 0;
let oScore = 0;

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

// Winning Patterns

const winPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

// Select Mode

pvpBtn.addEventListener("click", () => {

    gameMode = "pvp";

    resetGame();

});

aiBtn.addEventListener("click", () => {

    gameMode = "ai";

    resetGame();

});

// Cell Click

cells.forEach(cell => {

    cell.addEventListener(
    "click",
    handleCellClick
    );

});

function handleCellClick() {

    const index =
    this.dataset.index;

    if (
        board[index] !== "" ||
        !gameActive
    ) {
        return;
    }

    makeMove(index,currentPlayer);

    if (
        gameMode === "ai" &&
        gameActive &&
        currentPlayer === "O"
    ) {

        setTimeout(
        computerMove,
        500
        );

    }

}

// Make Move

function makeMove(index,player){

    board[index] = player;

    cells[index].textContent =
    player;

    cells[index].classList.add(
    player.toLowerCase()
    );

    checkWinner();

    if(gameActive){

        currentPlayer =
        player === "X"
        ? "O"
        : "X";

        statusText.textContent =
        `Player ${currentPlayer} Turn`;
    }

}

// Check Winner

function checkWinner(){

    let roundWon = false;

    for(let pattern of winPatterns){

        const a = board[pattern[0]];
        const b = board[pattern[1]];
        const c = board[pattern[2]];

        if(a === "" || b === "" || c === ""){
            continue;
        }

        if(a === b && b === c){

            roundWon = true;

            pattern.forEach(index => {

                cells[index]
                .classList
                .add("winner");

            });

            break;
        }
    }

    if(roundWon){

        statusText.textContent =
        `🎉 Player ${currentPlayer} Wins!`;

        gameActive = false;

        updateScore();

        return;
    }

    if(!board.includes("")){

        statusText.textContent =
        "🤝 Match Draw!";

        gameActive = false;
    }
}

// Update Score

function updateScore(){

    if(currentPlayer === "X"){

        xScore++;

        xScoreEl.textContent =
        xScore;

    }else{

        oScore++;

        oScoreEl.textContent =
        oScore;
    }

}

// Computer Move

function computerMove(){

    let emptyCells = [];

    board.forEach((value,index) => {

        if(value === ""){

            emptyCells.push(index);
        }

    });

    if(emptyCells.length === 0){

        return;
    }

    let randomIndex =

    emptyCells[
        Math.floor(
        Math.random()
        * emptyCells.length
        )
    ];

    makeMove(
    randomIndex,
    "O"
    );

}

// Restart Game

restartBtn.addEventListener(
"click",
resetGame
);

function resetGame(){

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    gameActive = true;

    currentPlayer = "X";

    statusText.textContent =
    "Player X Turn";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove(
        "x",
        "o",
        "winner"
        );

    });

}
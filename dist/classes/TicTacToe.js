import { PLAYER } from "../types/index.js";
class TicTacToe {
    constructor(n) {
        this.board = new Array(n).fill(new Array(n).fill(""));
        this.currentPlayer = PLAYER.X;
    }
    switchPlayer() {
        if (this.currentPlayer === PLAYER.X)
            this.currentPlayer = PLAYER.O;
        else
            this.currentPlayer = PLAYER.X;
    }
    onCellClick(element, i, j) {
        element.innerText = this.currentPlayer;
        this.board[i][j] = this.currentPlayer;
        console.log(i, j);
        console.log(this.board);
        this.switchPlayer();
        this.draw();
    }
    draw() {
        const boardElement = document.createElement('div');
        boardElement.classList.add("board");
        const n = this.board.length;
        for (let i = 0; i < n; i++) {
            const rowElement = document.createElement("div");
            rowElement.classList.add("row");
            for (let j = 0; j < n; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.innerText = this.board[i][j];
                cell.addEventListener("click", () => this.onCellClick(cell, i, j));
                rowElement.appendChild(cell);
            }
            boardElement.appendChild(rowElement);
            document.getElementsByTagName("body")[0].appendChild(boardElement);
        }
    }
    run() {
        this.draw();
    }
}
export default TicTacToe;

import { PLAYER } from "../types/index.js";
import { checkDiagonals, checkRowsAndColumns, generateBoard, isBoardFull } from "../utils/helpers.js";
class TicTacToe {
    constructor(size) {
        this.player1element = document.querySelector('.player1-score');
        this.tieElement = document.querySelector('.tie-score');
        this.player2element = document.querySelector('.player2-score');
        this.board = generateBoard(size);
        this.currentPlayer = PLAYER.X;
        this.terminated = false;
    }
    switchPlayer() {
        if (this.currentPlayer === PLAYER.X)
            this.currentPlayer = PLAYER.O;
        else
            this.currentPlayer = PLAYER.X;
    }
    checkForWin(i, j) {
        if (checkDiagonals(this.board) || checkRowsAndColumns(this.board, i, j)) {
            return true;
        }
        else {
            return false;
        }
    }
    onCellClick(element, i, j) {
        if (element.innerText)
            return;
        element.innerText = this.currentPlayer;
        this.board[i][j] = this.currentPlayer;
        if (this.checkForWin(i, j)) {
            this.terminated = true;
            this.boardRerender();
            if (this.currentPlayer === PLAYER.X) {
                this.player1element.innerText = String(Number(this.player1element.innerText) + 1);
            }
            else if (this.currentPlayer === PLAYER.O) {
                this.player2element.innerText = String(Number(this.player2element.innerText) + 1);
            }
            setTimeout(() => {
                this.board = generateBoard(this.board.length);
                this.removeBoard();
                this.terminated = false;
                this.drawBoard();
            }, 500);
        }
        else if (isBoardFull(this.board)) {
            this.tieElement.innerText = String(Number(this.tieElement.innerText) + 1);
            this.terminated = true;
            this.boardRerender();
            setTimeout(() => {
                this.board = generateBoard(this.board.length);
                this.removeBoard();
                this.terminated = false;
                this.drawBoard();
            }, 500);
        }
        this.switchPlayer();
        this.boardRerender();
    }
    removeEventListeners() {
        const cells = Array.from(document.querySelectorAll('.cell'));
        cells.forEach((cell) => cell.style.pointerEvents = 'none');
    }
    removeBoard() {
        const boardElement = document.querySelector('.board');
        boardElement === null || boardElement === void 0 ? void 0 : boardElement.parentNode.removeChild(boardElement);
    }
    drawBoard() {
        var _a;
        const body = document.getElementsByTagName("body")[0];
        const currentPlayerElementToRemove = document.querySelector('.current-player');
        (_a = currentPlayerElementToRemove === null || currentPlayerElementToRemove === void 0 ? void 0 : currentPlayerElementToRemove.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(currentPlayerElementToRemove);
        const boardElement = document.createElement('div');
        boardElement.classList.add("board");
        const currentPlayerElement = document.createElement("div");
        currentPlayerElement.innerText = `${this.currentPlayer.toUpperCase()} Turn`;
        currentPlayerElement.classList.add("current-player");
        const n = this.board.length;
        for (let i = 0; i < n; i++) {
            const rowElement = document.createElement("div");
            rowElement.classList.add("row");
            for (let j = 0; j < n; j++) {
                const cell = document.createElement("div");
                cell.style.fill = "";
                cell.classList.add("cell");
                cell.innerText = this.board[i][j];
                if (!this.terminated) {
                    cell.addEventListener("click", () => this.onCellClick(cell, i, j));
                }
                rowElement.appendChild(cell);
            }
            boardElement.appendChild(rowElement);
            body.appendChild(boardElement);
            body.appendChild(currentPlayerElement);
        }
    }
    boardRerender() {
        this.removeBoard();
        this.drawBoard();
    }
    run() {
        this.drawBoard();
    }
}
export default TicTacToe;

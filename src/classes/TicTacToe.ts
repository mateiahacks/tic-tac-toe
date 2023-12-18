import Game from "../types/Game";
import { PLAYER } from "../types/index.js";
import { checkDiagonals, checkRowsAndColumns, generateBoard, isBoardFull } from "../utils/helpers.js";

class TicTacToe implements Game {
    board: Array<string>[];
    currentPlayer: PLAYER;
    terminated: boolean;
    player1element: any = document.querySelector('.player1-score');
    tieElement: any = document.querySelector('.tie-score');
    player2element: any = document.querySelector('.player2-score');

    constructor(size: number) {
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

    checkForWin(i: number, j: number) {
        if (checkDiagonals(this.board) || checkRowsAndColumns(this.board, i, j)) {
            return true;
        } else {
            return false;
        }
    }

    onCellClick(element: HTMLElement, i: number, j: number) {
        if(element.innerText)
            return;

        element.innerText = this.currentPlayer;
        this.board[i][j] = this.currentPlayer;
        
        if (this.checkForWin(i, j)) {
            this.terminated = true;
            this.boardRerender();
            if (this.currentPlayer === PLAYER.X) {
                this.player1element.innerText = String(Number(this.player1element.innerText) + 1);
            } else if (this.currentPlayer === PLAYER.O) {
                this.player2element.innerText = String(Number(this.player2element.innerText) + 1);
            }
            setTimeout(() => {
                this.board = generateBoard(this.board.length);
                this.removeBoard();
                this.terminated = false;
                this.drawBoard();
            }, 500);
        } else if (isBoardFull(this.board)) {
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
        const cells: Array<any> = Array.from(document.querySelectorAll('.cell'));

        cells.forEach((cell) => cell.style.pointerEvents = 'none');
        
    }

    removeBoard() {
        const boardElement: any = document.querySelector('.board');
        boardElement?.parentNode.removeChild(boardElement); 
    }

    drawBoard() {
        const body = document.getElementsByTagName("body")[0];

        const currentPlayerElementToRemove = document.querySelector('.current-player');
        currentPlayerElementToRemove?.parentNode?.removeChild(currentPlayerElementToRemove);

        const boardElement: HTMLElement = document.createElement('div');
        boardElement.classList.add("board");

        const currentPlayerElement = document.createElement("div");
        currentPlayerElement.innerText = `${this.currentPlayer.toUpperCase()} Turn`;
        currentPlayerElement.classList.add("current-player");

        const n: number = this.board.length;
        for(let i=0; i<n; i++) {
            const rowElement = document.createElement("div");
            rowElement.classList.add("row");
            for(let j=0; j<n; j++) {
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


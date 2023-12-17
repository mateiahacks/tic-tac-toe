import Game from "../types/Game";
import { PLAYER } from "../types/index.js";
import { checkDiagonals, checkRowsAndColumns, generateBoard } from "../utils/helpers.js";

class TicTacToe implements Game {
    board: Array<string>[];
    currentPlayer: PLAYER;

    constructor(size: number) {
        this.board = generateBoard(size);
        this.currentPlayer = PLAYER.X;
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

        this.removeBoard();

        element.innerText = this.currentPlayer;
        this.board[i][j] = this.currentPlayer;

        if (this.checkForWin(i, j)) {
            setTimeout(() => {
                this.board = generateBoard(3);
                this.removeBoard();
                this.drawBoard();
            }, 500);
                
        }

        this.switchPlayer();

        this.drawBoard();
    }

    removeBoard() {
        const boardElement: any = document.querySelector('.board');
        boardElement?.parentNode.removeChild(boardElement); 
    }

    drawBoard() {
        const boardElement: HTMLElement = document.createElement('div');
        boardElement.classList.add("board");

        const n: number = this.board.length;
        for(let i=0; i<n; i++) {
            const rowElement = document.createElement("div");
            rowElement.classList.add("row");
            for(let j=0; j<n; j++) {
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
        this.drawBoard();
    }
}

export default TicTacToe;


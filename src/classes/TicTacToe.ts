import Game from "../types/Game";
import { PLAYER } from "../types/index.js";
import { generateBoard } from "../utils/helpers.js";

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

    onCellClick(element: HTMLElement, x: number, y: number) {
        if(element.innerText)
            return;

        this.removeBoard();

        element.innerText = this.currentPlayer;
        this.board[x][y] = this.currentPlayer;
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


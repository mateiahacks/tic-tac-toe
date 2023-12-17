export const generateBoard = (size) => {
    const newBoard = [];
    for (let i = 0; i < size; i++) {
        newBoard.push([...Array(size).fill("")]);
    }
    return newBoard;
};
export const checkDiagonals = (arr) => {
    // first diagonal
    const mainDiagonal = arr.map((row, index) => row[index]);
    // second diagonal
    const secondDiagonal = arr.map((row, index) => row[arr.length - 1 - index]);
    if (new Set(mainDiagonal).size === 1 && mainDiagonal[0]) {
        return true;
    }
    if (new Set(secondDiagonal).size === 1 && secondDiagonal[0]) {
        return true;
    }
    return false;
};
export const checkRowsAndColumns = (arr, i, j) => {
    const column = arr.map(r => r[j]);
    const row = arr[i];
    if (new Set(column).size === 1 || new Set(row).size === 1)
        return true;
    return false;
};

export const generateBoard = (size: number) => {
    const newBoard = [];
    for (let i=0; i<size; i++) {
        newBoard.push([...Array(size).fill("")]);
    }
    return newBoard;
}
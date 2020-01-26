export const createEmptyBoardObject = (rowsNumber, columnsNumber) => {
    const boardObject = {}
    for (let i=0; i<rowsNumber; i++) {
        boardObject[i] = new Array(columnsNumber).fill(false)
    }
    return boardObject
}

export const createBabyPulsarPattern = (rowsNumber, columnsNumber) => {
    const middleRow = Math.floor(rowsNumber / 2)
    const middleColumn = Math.floor(columnsNumber / 2)
    const newBoard = createEmptyBoardObject(rowsNumber, columnsNumber)
    newBoard[middleRow][middleColumn+1] = true
    newBoard[middleRow][middleColumn-1] = true
    newBoard[middleRow-1][middleColumn+1] = true
    newBoard[middleRow-1][middleColumn] = true
    newBoard[middleRow-1][middleColumn-1] = true
    newBoard[middleRow+1][middleColumn+1] = true
    newBoard[middleRow+1][middleColumn] = true
    newBoard[middleRow+1][middleColumn-1] = true
    newBoard[middleRow+2][middleColumn] = true
    newBoard[middleRow-1][middleColumn] = true
    newBoard[middleRow-2][middleColumn] = true
    return newBoard
}

export const createGliderPattern = (rowsNumber, columnsNumber) => {
    const middleRow = Math.floor(rowsNumber / 2)
    const middleColumn = Math.floor(columnsNumber / 2)
    const newBoard = createEmptyBoardObject(rowsNumber, columnsNumber)
    newBoard[middleRow][middleColumn] = true
    newBoard[middleRow][middleColumn+1] = true
    newBoard[middleRow-1][middleColumn-1] = true
    newBoard[middleRow+1][middleColumn] = true
    newBoard[middleRow+1][middleColumn-1] = true
    return newBoard
}

export const getCellNeighbors = (row, col, board) => {
    // get a number of live neighbor cells surrounding a certain cell
    // takes 3 params: row (number of row in the board): number,
    //                 col (number of column in the board): number,
    //                 board (current board): object  
    // returns: number (min: 0, max: 8)

    const [rowsNumber, columnsNumber] = getRowsColumnsNumber(board)

    // CASE 1: the cell is in the first row and in the first column
    if (row === 0 && col === 0) {
      return getNeighborsFirstRowFirstColumn(board)
    }
    // CASE 2: the cell is in the first row and in the last column
    if (row === 0 && col === columnsNumber-1) {
      return getNeighborsFirstRowLastColumn(board)
    }
    // CASE 3: the cell is in the last row and in the last column
    if (row === rowsNumber-1 && col === 0) {
      return getNeighborsLastRowLastColumn(board)
    }
    // CASE 4: the cell is in the last row and in the first column
    if (row === rowsNumber-1 && col === 0) {
      return getNeighborsLastRowFirstColumn(board)
    }
    // CASE 5: the cell is in the first row and not in the edge column
    if (row === 0 && col !== 0 && col !== columnsNumber-1) {
      return getNeighborsFirstRowNotColumnEdge(col, board)
    }
    // CASE 6: the cell is not in the edge row and in the last column
    if (row !== 0 && row !== rowsNumber-1 && col === columnsNumber-1) {
      return getNeighborsNotEdgeRowLastColumn(row, board)
    }
    // CASE 7: the cell is in the last row and not in the edge column
    if (row === rowsNumber-1 && col !== 0 && col !== columnsNumber-1) {
      return getNeighborsLastRowNotColumnEdge(col, board)
    }
    // CASE 8: the cell is not in the edge row and in the first column
    if (row !== 0 && row !== rowsNumber-1 && col === 0) {
      return getNeighborsNotEdgeRowFirstColumn(row, board)
    }
    // CASE 9: the cell is not in the edge row and not in the edge column
    if (row !== 0 && row !== rowsNumber-1 && col !== 0 && col !== columnsNumber-1) {
      return getNeighborsNotEdgeRowNotEdgeColumn(row, col, board)
    }
  }

  export const getNeighborsFirstRowFirstColumn = (board) => {
    const [rowsNumber, columnsNumber] = getRowsColumnsNumber(board)
    // CASE 1
    // clockwise starting from the right
    const neighbours = [
      board[0][1], //1
      board[1][1], //2
      board[1][0], //3
      board[1][columnsNumber-1], //4
      board[0][columnsNumber-1], //5
      board[rowsNumber-1][columnsNumber-1], //6
      board[rowsNumber-1][0], //7
      board[rowsNumber-1][1], //8
    ]
    return neighbours.filter(i => i).length
  }

  export const getNeighborsFirstRowLastColumn = (board) => {
    const [rowsNumber, columnsNumber] = getRowsColumnsNumber(board)
    // CASE 2
    // clockwise starting from the right
    const neighbours = [
      board[0][0], //1
      board[1][0], //2
      board[1][columnsNumber-1], //3
      board[1][columnsNumber-2], //4
      board[0][columnsNumber-2], //5
      board[rowsNumber-1][columnsNumber-2], //6
      board[rowsNumber-1][columnsNumber-1],  //7
      board[rowsNumber-1][0],  //8
    ]
    return neighbours.filter(i => i).length
  }

  export const getNeighborsLastRowLastColumn = (board) => {
    const [rowsNumber, columnsNumber] = getRowsColumnsNumber(board)
    // CASE 3
    // clockwise starting from the right
    const neighbours = [
      board[rowsNumber-1][0], //1
      board[0][0], //2
      board[0][columnsNumber-1], //3
      board[0][columnsNumber-2], //4
      board[rowsNumber-1][columnsNumber-2], //5
      board[rowsNumber-2][columnsNumber-2], //6
      board[rowsNumber-2][columnsNumber-1], //7
      board[rowsNumber-2][0],  //8
    
    ]
    return neighbours.filter(i => i).length
  }

  export const getNeighborsLastRowFirstColumn = (board) => {
    const [rowsNumber, columnsNumber] = getRowsColumnsNumber(board)
    // CASE 4
    // clockwise starting from the right
    const neighbours = [
      board[rowsNumber-1][1], //1
      board[0][1], //2
      board[0][0], //3
      board[0][columnsNumber-1], //4
      board[rowsNumber-1][columnsNumber-1], //5
      board[rowsNumber-2][columnsNumber-1], //6
      board[rowsNumber-2][0], //7
      board[rowsNumber-2][1],  //8
    ]
    return neighbours.filter(i => i).length
  }
  
  export const getNeighborsFirstRowNotColumnEdge = (col, board) => {
    const [rowsNumber, columnsNumber] = getRowsColumnsNumber(board)
    // CASE 5
    // clockwise starting from the right
    // takes two params - col (column number): number, board (current board): object
    const neighbours = [
      board[0][col+1], //1
      board[1][col+1], //2
      board[1][col], //3
      board[1][col-1], //4
      board[0][col-1], //5
      board[rowsNumber-1][col-1], //6
      board[rowsNumber-1][col], //7
      board[rowsNumber-1][col+1],  //8
    ]
    return neighbours.filter(i => i).length
  }

  export const getNeighborsNotEdgeRowLastColumn = (row, board) => {
    const [rowsNumber, columnsNumber] = getRowsColumnsNumber(board)
    // CASE 6
    // clockwise starting from the right
    // takes two params - row (row number): number, board (current board): object
    const neighbours = [
      board[row][0], //1
      board[row+1][0], //2
      board[row+1][columnsNumber-1], //3
      board[row+1][columnsNumber-2], //4
      board[row][columnsNumber-2], //5
      board[row-1][columnsNumber-2], //6
      board[row-1][columnsNumber-1], //7
      board[row-1][0],  //8
    ]
    return neighbours.filter(i => i).length
  }

  export const getNeighborsLastRowNotColumnEdge = (col, board) => {
    const [rowsNumber, columnsNumber] = getRowsColumnsNumber(board)
    // CASE 7
    // clockwise starting from the right
    // takes two params - col (column number): number, board (current board): object
    const neighbours = [
      board[rowsNumber-1][col+1], //1
      board[0][col+1], //2
      board[0][col], //3
      board[0][col-1], //4
      board[rowsNumber-1][col-1], //5
      board[rowsNumber-2][col-1], //6
      board[rowsNumber-2][col], //7
      board[rowsNumber-2][col+1],  //8
    ]
    return neighbours.filter(i => i).length
  }

  export const getNeighborsNotEdgeRowFirstColumn = (row, board) => {
    const [rowsNumber, columnsNumber] = getRowsColumnsNumber(board)
    // CASE 8
    // clockwise starting from the right
    // takes two params - row (row number): number, board (current board): object
    const neighbours = [
      board[row][1], //1
      board[row+1][1], //2
      board[row+1][0], //3
      board[row+1][columnsNumber-1], //4
      board[row][columnsNumber-1], //5
      board[row-1][columnsNumber-1], //6
      board[row-1][0], //7
      board[row-1][1],  //8
    ]
    return neighbours.filter(i => i).length
  }

  export const getNeighborsNotEdgeRowNotEdgeColumn = (row, col, board) => {
    // CASE 9
    // clockwise starting from the right
    // takes tree params - row (row number): number, col (column number): number, board (current board): object
    const neighbours = [
      board[row][col+1], //1
      board[row+1][col+1], //2
      board[row+1][col], //3
      board[row+1][col-1], //4
      board[row][col-1], //5
      board[row-1][col-1], //6
      board[row-1][col], //7
      board[row-1][col+1],  //8
    ]
    return neighbours.filter(i => i).length
  }

  export const getRowsColumnsNumber = board => {
      const rowsNumber = Object.keys(board).length
      let columnsNumber = 0
      if (rowsNumber > 0) {
        if (Array.isArray(board[0])) {
            columnsNumber = board[0].length
        }
      }
      return [rowsNumber, columnsNumber]
  }

  export const shouldLiveCellStayAlive = num => {
    // check whether a live cell should die or stay alive
    // takes one param: num (number of live neighbors): number
    // returns: boolean
    if (num < 2 || num > 3) {
      return false
    }
    return true
  }

  export const shouldDeadCellBecomeLive = num => {
    // check whether a dead cell should become alive or stay dead
    // takes one param: num (number of live neighbors): number
    // returns: boolean
    if (num === 3) {
      return true
    }
    return false
  }


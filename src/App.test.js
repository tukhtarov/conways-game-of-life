import {
  createEmptyBoardObject,
  getRowsColumnsNumber,
  getCellNeighbors,
  getNeighborsFirstRowFirstColumn,
  getNeighborsFirstRowLastColumn,
  getNeighborsLastRowLastColumn,
  getNeighborsLastRowFirstColumn,
  getNeighborsFirstRowNotColumnEdge,
  getNeighborsNotEdgeRowLastColumn,
  getNeighborsLastRowNotColumnEdge,
  getNeighborsNotEdgeRowFirstColumn,
  getNeighborsNotEdgeRowNotEdgeColumn,
  shouldLiveCellStayAlive,
  shouldDeadCellBecomeLive
} from './heplers'

describe('Unit tests for pure helper functions', () => {
  it('createEmptyBoardObject function should create empty board object', () => {
    const board = createEmptyBoardObject(3, 4) 
    expect(board).toMatchObject({
      0: [false, false, false, false],
      1: [false, false, false, false],
      2: [false, false, false, false]
    })
  })
  
  it('getRowsColumnsNumber function should return proper rows and columns number', () => {
    let board = {
      0: [false, false, false, false],
      1: [false, false, false, false],
      2: [false, false, false, false]
    }
    const [ rowsNumber, columnsNumber ] = getRowsColumnsNumber(board)
    expect(rowsNumber).toBe(3);
    expect(columnsNumber).toBe(4);
    board = {
      0: [],
    }
    const [ rowsNumber2, columnsNumber2 ] = getRowsColumnsNumber(board)
    expect(rowsNumber2).toBe(1);
    expect(columnsNumber2).toBe(0);
    board = {}
    const [ rowsNumber3, columnsNumber3 ] = getRowsColumnsNumber(board)
    expect(rowsNumber3).toBe(0);
    expect(columnsNumber3).toBe(0);
  })

  describe('getCellNeighbors', () => {
    it('getNeighborsFirstRowFirstColumn should return correct number of live cells', () => {
      let board = {
        0: [false, false, false, false, false],
        1: [false, true, false, false, false],
        2: [false, false, false, false, false],
        3: [false, false, false, false, false],
        4: [false, false, false, false, true],
      }
      const neigbors = getNeighborsFirstRowFirstColumn(board)
      expect(neigbors).toBe(2)
    })
    it('getNeighborsFirstRowLastColumn should return correct number of live cells', () => {
      let board = {
        0: [true, false, false, true, false],
        1: [true, true, false, false, false],
        2: [false, false, false, false, false],
        3: [false, false, false, false, false],
        4: [false, false, false, false, true],
      }
      const neigbors = getNeighborsFirstRowLastColumn(board)
      expect(neigbors).toBe(4)
    })
    it('getNeighborsLastRowLastColumn should return correct number of live cells', () => {
      let board = {
        0: [false, false, false, false, false],
        1: [true, true, false, false, false],
        2: [false, false, false, false, false],
        3: [false, false, false, false, false],
        4: [false, false, false, false, true],
      }
      const neigbors = getNeighborsLastRowLastColumn(board)
      expect(neigbors).toBe(0)
    })
    it('getNeighborsLastRowFirstColumn should return correct number of live cells', () => {
      let board = {
        0: [false, false, false, false, false],
        1: [true, true, false, false, false],
        2: [false, false, false, false, false],
        3: [false, false, false, false, false],
        4: [false, false, false, false, true],
      }
      const neigbors = getNeighborsLastRowFirstColumn(board)
      expect(neigbors).toBe(1)
    })
    it('getNeighborsFirstRowNotColumnEdge should return correct number of live cells', () => {
      let board = {
        0: [false, false, true, false, false],
        1: [true, true, false, false, false],
        2: [false, false, false, false, false],
        3: [false, false, false, false, false],
        4: [false, false, false, false, true],
      }
      const neigbors = getNeighborsFirstRowNotColumnEdge(3, board)
      expect(neigbors).toBe(2)
    })
    it('getNeighborsNotEdgeRowLastColumn should return correct number of live cells', () => {
      let board = {
        0: [false, false, true, false, false],
        1: [true, true, false, false, false],
        2: [false, false, false, false, false],
        3: [false, false, false, false, false],
        4: [false, false, false, false, true],
      }
      const neigbors = getNeighborsNotEdgeRowLastColumn(1, board)
      expect(neigbors).toBe(1)
    })
    it('getNeighborsLastRowNotColumnEdge should return correct number of live cells', () => {
      let board = {
        0: [false, false, true, false, false],
        1: [true, true, false, false, false],
        2: [false, false, false, false, false],
        3: [false, true, false, false, false],
        4: [false, true, true, false, true],
      }
      const neigbors = getNeighborsLastRowNotColumnEdge(2, board)
      expect(neigbors).toBe(3)
    })
    it('getNeighborsNotEdgeRowFirstColumn should return correct number of live cells', () => {
      let board = {
        0: [false, false, true, false, false],
        1: [true, true, false, false, false],
        2: [false, false, false, false, false],
        3: [false, false, false, false, false],
        4: [false, false, true, false, false],
      }
      const neigbors = getNeighborsNotEdgeRowFirstColumn(3, board)
      expect(neigbors).toBe(0)
    })
    it('getNeighborsNotEdgeRowNotEdgeColumn should return correct number of live cells', () => {
      let board = {
        0: [false, false, true, false, false],
        1: [true, true, false, false, false],
        2: [false, false, false, false, false],
        3: [false, true, false, true, false],
        4: [false, false, true, false, false],
      }
      const neigbors = getNeighborsNotEdgeRowNotEdgeColumn(2, 2, board)
      expect(neigbors).toBe(3)
    })
  })
  
  it('shouldLiveCellStayAlive should work correctly', () => {
    expect(shouldLiveCellStayAlive(1)).toBe(false)
    expect(shouldLiveCellStayAlive(4)).toBe(false)
    expect(shouldLiveCellStayAlive(2)).toBe(true)
    expect(shouldLiveCellStayAlive(3)).toBe(true)
  })

  it('shouldDeadCellBecomeLive should work correctly', () => {
    expect(shouldDeadCellBecomeLive(3)).toBe(true)
    expect(shouldDeadCellBecomeLive(4)).toBe(false)
    expect(shouldDeadCellBecomeLive(2)).toBe(false)
  })
 
})

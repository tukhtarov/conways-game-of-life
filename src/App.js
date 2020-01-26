import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import useInterval from './useInterval'
import {
  createEmptyBoardObject,
  createBabyPulsarPattern,
  createGliderPattern,
  getCellNeighbors,
  shouldLiveCellStayAlive,
  shouldDeadCellBecomeLive
} from './heplers'
import './App.scss';

function App() {
  //number of rows in the board
  const [ rowsNumber, setRowsNumber ] = useState(window.screen.width < 450 ? 10 : 25);
  // number of columns in the board
  const [ columnsNumber, setColumnsNumber ] = useState(window.screen.width < 450 ? 10 : 50);
  // board
  const [ board, changeBoard ] = useState({});
  // cell size
  const [ cellSize ] = useState(window.screen.width < 450 ? 30 : 20);
  // space between cells
  const [ spaceBetweenCells ] = useState(window.screen.width < 450 ? 6 : 2);
  // game start/pause
  const [ gameStatus, startGame ] = useState(false);
  // generations store
  const [ generations, updateGenerations ] = useState([]);
  // generatin count
  const [ generationCount, setGenerationCount ] = useState(0);

  useInterval(generate, 300, gameStatus);

  function generate() {
    const newBoard = {}
    for (const k in board) {
      newBoard[k] = []
      board[k].forEach((isAlive, i) => {
        const numberOfNeighbors = getCellNeighbors(+k,i, board)
        const liveStatus = isAlive ? shouldLiveCellStayAlive(numberOfNeighbors) : shouldDeadCellBecomeLive(numberOfNeighbors)
        newBoard[k].push(liveStatus)
      })
    }
    updateGenerations([...generations, newBoard])
    changeBoard(newBoard)
    setGenerationCount(generationCount+1)
  }

  const onCreateBabyPulsarPattern = () => {
    createEmptyBoard()
    const newBoard = createBabyPulsarPattern(rowsNumber, columnsNumber)
    setGenerationCount(0)
    updateGenerations([newBoard])
    changeBoard(newBoard)
  }

  const onCreateGliderPattern = () => {
    createEmptyBoard()
    const newBoard = createGliderPattern(rowsNumber, columnsNumber)
    setGenerationCount(0)
    updateGenerations([newBoard])
    changeBoard(newBoard)
  }

  const createEmptyBoard = () => {
    const boardObject = createEmptyBoardObject(rowsNumber, columnsNumber)
    updateGenerations([boardObject])
    changeBoard(boardObject)
  }

  useEffect(createEmptyBoard, [])

  const clearBoard = () => {
    startGame(false)
    createEmptyBoard()
    setGenerationCount(0)
  }

  const onStartPauseResumeClick = () => {
    if (gameStatus) {
      startGame(false)
    } else {
      startGame(true)
    }
  }

  const addColumn = () => {
    setColumnsNumber(columnsNumber+1)
    const newBoard = {}
    for (const k in board) {
      newBoard[k] = [...board[k], false]
    }
    changeBoard(newBoard)
  }

  const removeColumn = () => {
    if (columnsNumber === 10) return
    setColumnsNumber(columnsNumber-1)
    const newBoard = {}
    for (const k in board) {
      newBoard[k] = board[k].slice(0, -1)
    }
    changeBoard(newBoard)
  }
  
  const addRow = () => {
    setRowsNumber(rowsNumber+1)
    const newBoard = {}
    for (const k in board) {
      newBoard[k] = [...board[k]]
    }
    newBoard[rowsNumber] = new Array(columnsNumber).fill(false)
    changeBoard(newBoard)
  }
  const removeRow = () => {
    if (rowsNumber === 10) return
    setRowsNumber(rowsNumber-1)
    const newBoard = {}
    for (const k in board) {
      newBoard[k] = [...board[k]]
    }
    delete newBoard[rowsNumber-1]
    changeBoard(newBoard)
  }

  const onCellClick = (e) => {
    const [ rowNumber, columnNumber ] = e.target.id.split('-')
    const newBoard = {}
    for (const k in board) {
      newBoard[k] = [...board[k]]
    }
    newBoard[rowNumber][columnNumber] = !newBoard[rowNumber][columnNumber]
    changeBoard(newBoard)
  }

  const onPrevButtonClick = () => {
    if (generationCount === 0) return
    setGenerationCount(generationCount-1)
    const prevBoard = generations[generationCount-1]
    changeBoard(prevBoard)
  }

  const onNextButtonClick = () => {
    const board = generations[generationCount+1]
    if (board) {
      changeBoard(board)
      setGenerationCount(generationCount+1)
    } else {
      generate()
    }
  }

  const renderTable = () => {
    const table = []
    for (let k in board) {
      table.push(
        <div className='App__board_table_row' key={k}>
          {board[k].map((item, i) =>
            <div
              key={`${k}-${i}`}
              id={`${k}-${i}`}
              onClick={onCellClick}
              className={classNames({
                'App__board_table_cell': true,
                'App__board_table_cell_live': item,
              })}
            />)}
        </div>
      )
    }
    return table
  }

  return (
    <div className="App">
      <h2>Game of Life</h2>
      <div>
        <button onClick={addColumn}>Add Column (to the right side)</button>
        <button onClick={removeColumn}>Remove Column (from the right side)</button>
      </div>
      <div>
        <button onClick={addRow}>Add Row (to the bottom)</button>
        <button onClick={removeRow}>Remove Row (from the bottom)</button>
      </div>
      <div>Generation: {generationCount}</div>
      <div>
        <button onClick={onStartPauseResumeClick}>Start/Pause/Resume</button>
        <button onClick={clearBoard}>Clear board</button>
      </div>
      <div>
        <button disabled={gameStatus} onClick={onPrevButtonClick}>Prev</button>
        <button disabled={gameStatus} onClick={onNextButtonClick}>Next</button>
      </div>
      <div>Patterns</div>
      <div>
        <button onClick={onCreateBabyPulsarPattern}>Baby Pulsar</button>
        <button onClick={onCreateGliderPattern}>Glider</button>
      </div>
      <div className="App__board">
        <div
          className='App__board_table'
          style={{ width: `${(columnsNumber*(cellSize+spaceBetweenCells))}px` }}
        >
          {renderTable()}
        </div>
      </div>   
    </div>
  );
}

export default App;

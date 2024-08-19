import { useState } from "react"

const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gmaeBoard, setGameBoard]=useState(initalGameBoard)

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoaed) => {
      const updateBoard = [...prevGameBoaed.map(innerArray => [...innerArray])]; // 深拷貝 因為直接改職會影響到原始值
      updateBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updateBoard
    });

    onSelectSquare();
  }

  return(
    <ol id="game-board">
      {gmaeBoard.map((row, rowIndex) => 
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => 
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>)
            }
          </ol>
        </li>
      )}
    </ol>
  )
}

const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

export default function GameBoard({ onSelectSquare, turns }) {
  let gmaeBoard = initalGameBoard;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gmaeBoard[row][col] = player;
  }

  return(
    <ol id="game-board">
      {gmaeBoard.map((row, rowIndex) => 
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => 
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol}>{playerSymbol}</button>
              </li>)
            }
          </ol>
        </li>
      )}
    </ol>
  )
}
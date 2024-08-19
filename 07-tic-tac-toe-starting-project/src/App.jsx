import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  let gmaeBoard = [...initalGameBoard.map(array => [...array])];

  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  })

  function handelPlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers, [symbol]:newName
      }
    });
  }

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gmaeBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gmaeBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gmaeBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gmaeBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) => currActivePlayer === "X" ? "O" : "X");
    setGameTurns(prevTuens => {
      const currentPlayer = deriveActivePlayer(prevTuens);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer}, ...prevTuens];

      return updatedTurns
    });
  }

  function handelRestart() {
    setGameTurns(()=>[])
  }

  return (
   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player
          initialName="Player 1"
          symbol="X"
          isActive={activePlayer === "X"}
          onChangeName={handelPlayerNameChange}
        />
        <Player
          initialName="Player 2"
          symbol="O"
          isActive={activePlayer === "O"}
          onChangeName={handelPlayerNameChange}
        />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handelRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gmaeBoard}/>
    </div>
    <Log turns={gameTurns}/>
   </main>
  )
}

export default App

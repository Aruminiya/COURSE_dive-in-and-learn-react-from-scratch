import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((currActivePlayer) => currActivePlayer === "X" ? "O" : "X");
    setGameTurns(prevTuens => {
      let currentPlayer = 'X';

      if (prevTuens,length > 0 && prevTuens[0].player === 'X') {
        currentPlayer = 'O'
      }

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: activePlayer}, ...prevTuens];

      return updatedTurns
    });
  }

  return (
   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name="Player 1" symbol="X" isActive={activePlayer === "X"}/>
        <Player name="Player 2" symbol="O" isActive={activePlayer === "O"}/>
      </ol>

      <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
    </div>
    <Log />
   </main>
  )
}

export default App

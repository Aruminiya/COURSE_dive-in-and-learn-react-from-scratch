import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";

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

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) => currActivePlayer === "X" ? "O" : "X");
    setGameTurns(prevTuens => {
      const currentPlayer = deriveActivePlayer(prevTuens);
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer}, ...prevTuens];

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
    <Log turns={gameTurns}/>
   </main>
  )
}

export default App

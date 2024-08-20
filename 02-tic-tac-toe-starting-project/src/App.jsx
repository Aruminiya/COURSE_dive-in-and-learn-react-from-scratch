import { useState } from "react"

import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
};

function deriveWinner(gmaeBoard, players){
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gmaeBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gmaeBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gmaeBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
};

function deriveGameBoard(gameTurns) {
  let gmaeBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gmaeBoard[row][col] = player;
  }
  return gmaeBoard;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const [players, setPlayers] = useState(PLAYERS);
  const gmaeBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gmaeBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handelRestart() {
    setGameTurns(()=>[])
  };
  function handelPlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers, [symbol]:newName
      }
    });
  }
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
        <Player
          initialName={PLAYERS.X}
          symbol="X"
          isActive={activePlayer === "X"}
          onChangeName={handelPlayerNameChange}
        />
        <Player
          initialName={PLAYERS.O}
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
};

export default App

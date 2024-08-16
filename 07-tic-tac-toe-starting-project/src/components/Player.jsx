import { useState } from "react"

export default function Player({name, symbol}) {
  const [playerData, setPlayerData] = useState({
    name,
    symbol
  })

  function editPlayer(event) {
    setPlayerData({...playerData ,name: event.target.value})
  }

  return (
    <li>
      <span className="player">
        <span className="player-name">{playerData.name}</span>
        <input type="text"
          value={playerData.name}
          onChange={(event)=>editPlayer(event)}
        />
        <span className="player-name">{playerData.symbol}</span>
      </span>
      <button onClick={() => {}}>Edit</button>
    </li>
  )
}
import { useState } from "react"

export default function Player({name, symbol, isActive}) {
  const [isEditing, setIsEditing] = useState(false);
  
  const [playerData, setPlayerData] = useState({
    name,
    symbol
  })

  let playerName = <span className="player-name">{playerData.name}</span>;
  if (isEditing) {
    playerName = <input type="text"
    value={playerData.name}
    onChange={(event)=>editPlayer(event)}
    />
  }

  function handleEditClick() {
    setIsEditing((editing) => !editing)
  }

  function editPlayer(event) {
    setPlayerData((data) => ({...data ,name: event.target.value}))
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-name">{playerData.symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}
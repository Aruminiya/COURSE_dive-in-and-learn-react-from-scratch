import { useState } from "react"

export default function Player({initialName, symbol, isActive, onChangeName}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  let editPlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editPlayerName = <input type="text"
    value={playerName}
    onChange={(event)=>editPlayer(event)}
    />
  }

  function handleEditClick() {
    setIsEditing((editing) => !editing)
    
    if (isEditing) {
      onChangeName(symbol, playerName)
    }
    
  }

  function editPlayer(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editPlayerName}
        <span className="player-name">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}
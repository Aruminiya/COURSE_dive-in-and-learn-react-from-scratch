import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();

  const [enterPlayerName, setEnterPlayerName] = useState(null);

  function handleClick() {
    // setSubmitted(()=>true);
    setEnterPlayerName(playerName.current.value);
    playerName.current.value = ''
  };

  return (
    <section id="player">
      <h2>Welcome {enterPlayerName ?? 'unknown entity'}</h2>
      {/* 如果 enterPlayerName 是 true 輸出 enterPlayerName ，反之 輸出 'unknown entity' */}
      <p>
        <input 
          ref={playerName}
          type="text"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}

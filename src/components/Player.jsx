import { useState } from "react";

export default function Player({name:InitialName, symbol, isActive, onChangeName}){
    const [isEdited, setIsEdited] = useState(false); //handle edit save button
    const [playerName, setPlayerName] = useState(InitialName); //handle name input

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    function handleSelectButton(){
        setIsEdited(!isEdited);

        if(isEdited){
            onChangeName(symbol,playerName)
        }
    }

    let editPlayerName = <span className="player-name">{playerName}</span>

    if(isEdited){
        editPlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    }

    return(
        <li className={isActive ? 'active': undefined}>
            <span className="player-info">
              {editPlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleSelectButton}>{isEdited ? 'Save' : 'Edit'}</button>
        </li>
    );
}
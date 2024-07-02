import { useState } from "react";



export default function Gameboard({onSelectPlayer, board}) {
    // const[gameboard,setGameboard]=useState(initialGameBoard); //Change the symbol in board
    
    // function handleGameboard(rowIndex,colIndex){
    //     setGameboard((prevGameboard)=>{
    //         const updatedBoard = [...prevGameboard.map(innerArr => [...innerArr])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard
    //     });
    //     onSelectPlayer();
    // }

    

    return (
      <ol id='game-board'>
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button onClick={() => onSelectPlayer(rowIndex,colIndex)} disabled={playerSymbol!==null}>
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
  }
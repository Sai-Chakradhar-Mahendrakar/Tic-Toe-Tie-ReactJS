import { useState } from 'react';
import Player from './components/Player';
import Gameboard from './components/Gameboard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './WINNING_COMBINATIONS';
import GameOver from './components/GameOver';

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer ='O';
  }

  return currentPlayer;
}



function App() {
  // const [activePlayer,setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({
    X:'player1',
    O:'player2'
  })

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  let gameBoard = [...initialGameBoard.map(innerArr => [...innerArr])];
  // [...prevGameboard.map(innerArr => [...innerArr])]

  for(const turn of gameTurns){
    const {square,player}=turn;
    const {row,col}=square;

    gameBoard[row][col]=player;
  }

  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }

  const isDraw = gameTurns.length===9 && !winner;

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleActivePlayer(rowIndex, colIndex){
    // setActivePlayer((currPlayer) => currPlayer==='X'?'O':'X')
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {square:{row:rowIndex, col:colIndex}, player:currentPlayer},
        ...prevTurns,
      ]

      return updatedTurns;
    });
  }

  function handleRematch(){
    setGameTurns([]);
  }

  return (
    <menu>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player name='Player1' symbol='X' isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
          <Player name='Player2' symbol='O' isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRematch}/>}
        <Gameboard onSelectPlayer={handleActivePlayer} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </menu>
  )
}

export default App

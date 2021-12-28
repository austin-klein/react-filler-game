import { useState } from 'react';
import './App.css';

function App() {
  const [squares, setSquares] = useState([]);
  const [scale, setScale] = useState(false);
  const [disabled, setDisabled] = useState();
  const [player, setPlayer] = useState('player-one');
  const [playerOneScore, setPlayerOneScore] = useState(1);
  const [playerTwoScore, setPlayerTwoScore] = useState(1);
  const [hide, setHide] = useState(true);
  const colors = [
    { colorName: 'gray', colorValue: 'rgb(85, 85, 85)' },
    { colorName: 'yellow', colorValue: 'rgb(255, 227, 30)' },
    { colorName: 'blue', colorValue: 'rgb(50, 146, 217)' },
    { colorName: 'green', colorValue: 'rgb(156, 207, 78)' },
    { colorName: 'red', colorValue: 'rgb(245, 32, 84)' },
    { colorName: 'purple', colorValue: 'rgb(105, 69, 162)' },
  ];
  let initialSquares = [];

  const startGame = () => {
    setHide(false);
    for (let i = 1; i < 101; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      let player = 'no-player';
      if (i === 91) {
        player = 'player-one';
        setDisabled(colors[randomIndex].colorName);
      }
      if (i === 10) {
        player = 'player-two';
      }

      const newSquare = {
        id: i,
        colorName: colors[randomIndex].colorName,
        colorValue: colors[randomIndex].colorValue,
        player,
      };
      initialSquares.push(newSquare);
    }
    setSquares(initialSquares);
  };

  const checkSquares = (color) => {
    if (color === disabled) return;
    const squareCopy = [...squares];
    // get player one squares
    squareCopy.forEach((square) => {
      if (square.player === player) {
        const index = square.id - 1;

        const checkTop = squareCopy[index - 10];
        let checkRight = {};
        if (
          square.id !== 10 &&
          square.id !== 20 &&
          square.id !== 30 &&
          square.id !== 40 &&
          square.id !== 50 &&
          square.id !== 60 &&
          square.id !== 70 &&
          square.id !== 80 &&
          square.id !== 90 &&
          square.id !== 100
        ) {
          checkRight = squareCopy[index + 1];
        }
        const checkBottom = squareCopy[index + 10];
        let checkLeft = {};
        console.log(square.id);
        if (
          square.id !== 1 &&
          square.id !== 11 &&
          square.id !== 21 &&
          square.id !== 31 &&
          square.id !== 41 &&
          square.id !== 51 &&
          square.id !== 61 &&
          square.id !== 71 &&
          square.id !== 81 &&
          square.id !== 91
        ) {
          checkLeft = squareCopy[index - 1];
        }

        const checkedSquares = [
          checkTop ? checkTop : {},
          checkRight ? checkRight : {},
          checkBottom ? checkBottom : {},
          checkLeft ? checkLeft : {},
        ];
        console.log(checkedSquares);
        const squareRightColor = checkedSquares.filter(
          (square) => square.colorName === color && square.player === 'no-player'
        );
        squareRightColor.forEach((square) => {
          squareCopy[square.id - 1].player = player;
        });
      }
    });
    const changeColorOfPlayerOneSquares = squareCopy.filter((square) => square.player === player);
    changeColorOfPlayerOneSquares.forEach((square) => {
      square.colorName = color;
      const rightColor = colors.filter((c) => {
        return c.colorName === color;
      });
      console.log(rightColor[0].colorValue);
      square.colorValue = rightColor[0].colorValue;
      setDisabled(rightColor[0].colorName);
    });

    setSquares([...squareCopy]);
    setScale(true);
    setTimeout(() => {
      setScale(false);
      setPlayer(player === 'player-one' ? 'player-two' : 'player-one');
    }, 1000);
    updateScore();
  };

  const updateScore = () => {
    const playerOne = squares.filter((square) => square.player === 'player-one');
    const playerTwo = squares.filter((square) => square.player === 'player-two');
    setPlayerOneScore(playerOne.length);
    setPlayerTwoScore(playerTwo.length);
  };

  return (
    <div className='container'>
      <div className='score'>
        <div className='score_number'>{playerOneScore}</div>
        <div className='score_number'>{playerTwoScore}</div>
      </div>
      <div className='game-board'>
        {squares.map((square) => (
          <div
            className={
              scale && square.player === player
                ? `square ${square.player} scale`
                : `square ${square.player} `
            }
            style={{ backgroundColor: `${square.colorValue}` }}
            key={square.id}></div>
        ))}
      </div>
      <div className='buttons'>
        <div
          onClick={(e) => checkSquares(e.target.id)}
          className={disabled === 'gray' ? 'button-small button-gray' : 'button button-gray'}
          id='gray'></div>
        <div
          onClick={(e) => checkSquares(e.target.id)}
          className={disabled === 'yellow' ? 'button-small button-yellow' : 'button button-yellow'}
          id='yellow'></div>
        <div
          onClick={(e) => checkSquares(e.target.id)}
          className={disabled === 'blue' ? 'button-small button-blue' : 'button button-blue'}
          id='blue'></div>
        <div
          onClick={(e) => checkSquares(e.target.id)}
          className={disabled === 'green' ? 'button-small button-green' : 'button button-green'}
          id='green'></div>
        <div
          onClick={(e) => checkSquares(e.target.id)}
          className={disabled === 'red' ? 'button-small button-red' : 'button button-red'}
          id='red'></div>
        <div
          onClick={(e) => checkSquares(e.target.id)}
          className={disabled === 'purple' ? 'button-small button-purple' : 'button button-purple'}
          id='purple'></div>
      </div>
      {hide && (
        <button className='start' onClick={() => startGame()}>
          Start Game
        </button>
      )}
    </div>
  );
}

export default App;

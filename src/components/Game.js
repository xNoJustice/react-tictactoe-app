import React, { useState } from 'react';
import Board from './Board';
import Winner from '../Winner';

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXisNext] = useState(true);
    const winner = Winner(history[stepNumber], stepNumber);
    const x0 = xIsNext ? "X" : "O";

    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];

        if(winner || squares[i]) return;

        squares[i] = x0;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXisNext(!xIsNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXisNext(step % 2 === 0);
    };

    const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

    const reset = () => {
        setHistory([Array(9).fill(null)]);
        setStepNumber(0);
        setXisNext(true);
    }

    const resetButton = () => {
        return ( 
            <button onClick={() => reset()}>Restart Game</button>
        )
    }

    return (
        <>
          <h1>TicTacToe App</h1>
          <Board squares={history[stepNumber]} onClick={handleClick} />
          <div className="footer">
            <div>
              <h2>History</h2>
              {renderMoves()}
            </div>
            <h3>{winner ? "Winner: " + winner : "Next Player: " + x0} <br />{winner ? resetButton() : ''}</h3>
          </div>
        </>
    );
};

export default Game;
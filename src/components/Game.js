import React, { useEffect, useState } from "react";
import _ from "lodash";
import classNames from "classnames";

import { isWinner } from "../helper";

const Moves = {
  X: "X",
  O: "O"
};

const Game = () => {
  const [nextMove, setNextMove] = useState(Moves.X);
  const [history, setHistory] = useState([]);
  const [endOfGame, setEndOfGame] = useState(false);
  const [boardSize, setBoardSize] = useState(3);
  const [moveNumber, setMoveNumber] = useState(0);
  const [resetGame, setResetGame] = useState(false);
  const [winnersCells, setWinnersCells] = useState([]);
  const boardSizes = [3, 4, 5];

  const buildEmptyBoard = (boardSize) =>
    Array(boardSize)
      .fill(null)
      .map((_) => Array(boardSize).fill(null));

  useEffect(() => {
    setHistory([buildEmptyBoard(boardSize)]);
    setNextMove(Moves.X);
    setMoveNumber(0);
    setEndOfGame(false);
    setWinnersCells([]);
  }, [boardSize, resetGame]);

  const handleResetGame = () => {
    setResetGame(!resetGame);
  };

  const handleBoardSizeChange = (event) => {
    const newBoardSize = event.target.value;
    setBoardSize(parseInt(newBoardSize, 10));
  };

  const toggleNextMove = () => {
    setNextMove((currentMove) => (currentMove === Moves.X ? Moves.O : Moves.X));
    setMoveNumber((moveNumber) => moveNumber + 1);
  };

  const handleMove = (x, y) => {
    let historyClone = _.cloneDeep(history);
    const currentBoardStateClone = historyClone[moveNumber];
    currentBoardStateClone[x][y] = nextMove;

    toggleNextMove();

    setHistory([...history.slice(0, moveNumber + 1), currentBoardStateClone]);

    const isWinnersCells = isWinner(
      x,
      y,
      nextMove,
      currentBoardStateClone,
      boardSize
    );
    if (!!isWinnersCells.length) {
      setWinnersCells(isWinnersCells);
      setEndOfGame(true);
    }
  };

  const handleStepBack = () => {
    setMoveNumber((moveNumber) => moveNumber - 2);
    setHistory([...history.slice(0, moveNumber)]);
    toggleNextMove();
  };

  const boardHeader = (
    <div>
      {history.length > 1 && endOfGame && <div>End of Game!</div>}
      <div className="board-header">
        <button
          disabled={moveNumber === 0 || endOfGame}
          onClick={handleStepBack}
        >
          &#8610; Back
        </button>
        <button onClick={handleResetGame}>Reset &#8634;</button>
      </div>
    </div>
  );

  if (!history.length) {
    return <div>Loading</div>;
  }

  return (
    <div className="game">
      <div className="header">
        <label htmlFor="board-size">Set the Board Size:</label>
        <select
          name="boardSize"
          id="board-size"
          value={boardSize}
          onChange={handleBoardSizeChange}
        >
          {boardSizes.map((size, i) => (
            <option key={i} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="board">
        {boardHeader}
        <div>
          {history[moveNumber].map((row, x) => {
            return (
              <div key={x} className="row">
                {row.map((value, y) => (
                  <button
                    key={`${x}-${y}`}
                    className={classNames({
                      cell: true,
                      highlighted: winnersCells.includes(`${x}-${y}`)
                    })}
                    disabled={value || endOfGame}
                    onClick={() => handleMove(x, y)}
                  >
                    <span>{value}</span>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Game;

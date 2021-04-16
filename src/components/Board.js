
import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick }) => (
  <div className="board">
    {squares.map((square, i) => (
      <Square className="square" key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

export default Board;
import React, { useState, useEffect, useRef } from 'react'

import Button from './Button'
import Calculate from './Calculate'


function Gameboard() {
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  let squares = [...boardSquares]

  let indexArr = boardSquares.map((ele, i, arr) => {
    if (ele === null) {
      return i
    }
  }).filter(x => x !== undefined)

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current && winner === null) {
      compMove()
    } else {
      isMounted.current = true
    }
  }, [xIsNext])

  const handleClick = index => {
    squares = [...boardSquares]

    //if index of board is filled return
    if (Calculate(boardSquares) || squares[index]) return

    //add X or O
    squares[index] = 'X'
    setBoardSquares(squares)
    setXIsNext(!xIsNext)
  }

  const compMove = () => {
    setTimeout(() => {
      let randomIndex = indexArr[Math.floor(Math.random() * indexArr.length)]
      console.log(randomIndex)
      squares[randomIndex] = 'O'
      setBoardSquares(squares)
      setXIsNext(xIsNext)
    }, 1000)
  }

  //create a rendersquare function
  const renderSquare = index => {
    return <Button value={boardSquares[index]} onClick={() => handleClick(index)} />
  }

  let status
  const winner = Calculate(boardSquares)
  status = winner ? `Winner is ${winner}` : `Next player is: ${xIsNext ? 'X' : 'O'}`

  return (
    <div className='gameboard-board'>
      <h1>TIC TAC TOE</h1>
      <div className='gameboard-grid'>
        <div className='row-1'>{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}</div>
        <div className='row-2'>{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}</div>
        <div className='row-3'>{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}</div>
      </div>
      <h1>{status}</h1>
    </div>
  )
}

export default Gameboard
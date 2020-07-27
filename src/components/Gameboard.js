import React, { useState, useEffect, useRef } from 'react'

import Button from './Button'
import Calculate from './Calculate'
import Score from './Score'


function Gameboard() {
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [xWins, setXWins] = useState(0)
  const [yWins, setYWins] = useState(0)
  let squares = [...boardSquares]


  let indexArr = boardSquares.map((ele, i, arr) => {
    if (ele === null) {
      return i
    }
  }).filter(x => x !== undefined)


  useEffect(() => {
    console.log(winner)
    console.log(xWins, yWins)
  })



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

      squares[randomIndex] = 'O'
      setBoardSquares(squares)
      setXIsNext(xIsNext)
    }, 1000)
  }


  const resetGame = () => {
    if (winner && winner === 'X') {
      setXWins(xWins + 1)
    } else if (winner && winner === 'O') {
      setYWins(yWins + 1)
    }
    setBoardSquares(Array(9).fill(null))
    setXIsNext(xIsNext)
  }


  //create a rendersquare function
  const renderSquare = index => {
    return <Button value={boardSquares[index]} onClick={() => handleClick(index)} />
  }


  let status
  let buttonStatus
  let winner = Calculate(boardSquares)

  buttonStatus = winner || winner === null && !boardSquares.includes(null) ? 'PLAY AGAIN' : 'RESET'

  status = winner ?
    `Winner is ${winner}` :
    winner === null && !boardSquares.includes(null) ?
      `No Winner` :
      `Next player is: ${xIsNext ? 'X' : 'O'}`


  return (
    <div className='gameboard-board'>
      <Score
        xWins={xWins}
        yWins={yWins}
      />
      <h1>TIC - TAC - TOE</h1>
      <div className='gameboard-grid'>
        <div className='row-1'>{renderSquare(0)}{renderSquare(1)}{renderSquare(2)}</div>
        <div className='row-2'>{renderSquare(3)}{renderSquare(4)}{renderSquare(5)}</div>
        <div className='row-3'>{renderSquare(6)}{renderSquare(7)}{renderSquare(8)}</div>
      </div>
      <h1>{status}</h1>
      <button onClick={() => resetGame()}>{buttonStatus}</button>
    </div>
  )
}

export default Gameboard
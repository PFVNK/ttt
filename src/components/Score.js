import React from 'react'

function Score({
  xWins,
  yWins
}) {
  return (
    <div className='score-container'>
      <div className='score-score'>
        X<span className='score-number'>:</span>{xWins} O<span className='score-number'>:</span>{yWins}
      </div>

    </div>
  )
}

export default Score
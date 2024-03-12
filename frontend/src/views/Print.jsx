import React from 'react'
import Game from '../components/Game'
import BackgroundAnimation from '../components/BackgroundAnimation';

const Print = () => {
  return (
    <div className='game-container'>
      <BackgroundAnimation/>
      <div className="game-board">
      <Game/>
      </div>
    </div>
  )
}

export default Print

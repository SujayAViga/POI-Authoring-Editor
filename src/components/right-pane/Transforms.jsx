import React from 'react'
import Position from './Position'
import Rotation from './Rotation'
import Scale from './Scale'

function Transforms() {
  return (
    <div className='transforms-container'>
        Transforms
        <Position/>
        <Rotation/>
        <Scale/>
    </div>
  )
}

export default Transforms
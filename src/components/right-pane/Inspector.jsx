import React from 'react'
import './Inspector.css'

import Transforms from './Transforms'
import PoiText from './PoiText'


function Inspector() {
  return (
    <div className='inpector-container'>
      <Transforms/>
      <PoiText />
      <input placeholder='locale'/>
      <input placeholder='url'/>
    </div>
  )
}

export default Inspector
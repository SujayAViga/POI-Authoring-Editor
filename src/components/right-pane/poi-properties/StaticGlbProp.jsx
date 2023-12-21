import React from 'react'
import Transforms from '../Transforms'

function StaticGlbProp() {
  return (
    <>
      <Transforms/>
      <div className='property-container'>
        <h4>Static Glb Prop</h4>
        <input placeholder='Glb Url'/>
      </div>
    </>
  )
}

export default StaticGlbProp
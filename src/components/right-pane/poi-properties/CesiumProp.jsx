import React from 'react'
import Transforms from '../Transforms'

function CesiumProp() {
  return (
    <>
      <Transforms/>
      <div className='property-container'>
        <h4>Cesium Asset Prop</h4>
        <input placeholder='Asset ID'/>
        <input placeholder='Ion Token' />
      </div>
    </>
  )
}

export default CesiumProp
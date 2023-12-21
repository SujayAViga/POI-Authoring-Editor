import React from 'react'
import Transforms from '../Transforms'

function AnimatedGltfProp() {
  return (
    <>
      <Transforms/>
      <div className='property-container'>
        <h4>Animated Gltf</h4>
        <input placeholder='url'/>
      </div>
    </>
    
  )
}

export default AnimatedGltfProp
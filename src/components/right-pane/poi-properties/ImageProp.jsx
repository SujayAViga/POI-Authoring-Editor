import React from 'react'
import Transforms from '../Transforms'

function ImageProp() {
  return (
    <>
      <Transforms/>  
      <div className='property-container'>
        <h4>Image Prop</h4>
        <input placeholder='Image url'/>
      </div>
    </>
    
  )
}

export default ImageProp
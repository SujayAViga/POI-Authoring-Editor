import React from 'react'
import Transforms from '../Transforms'

function VideosProp() {
  return (
    <>
      <Transforms/>
      <div className='property-container'>
        <h4>Video Prop</h4>
        <input placeholder='Video url'/>
      </div>
    </>
  )
}

export default VideosProp
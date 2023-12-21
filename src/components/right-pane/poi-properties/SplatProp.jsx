import React, { useState } from 'react'
import Transforms from '../Transforms'
import { Button } from 'react-bootstrap'

function SplatProp({setSplatUrl}) {
  const [splatLocalUrl, setSplatLocalUrl] = useState('')
  const handleSplatFetch = () =>{
    setSplatUrl(splatLocalUrl)
  }


  return (
    <>
      <Transforms/>
      <div className='property-container'>
        <h4>Splat Property</h4>
        <input placeholder='locale'/>
        <input placeholder='Splat url' onChange={(e)=>{setSplatLocalUrl(e.target.value)}}/>
        <input placeholder='Exit portal'/>
        <input placeholder='Entry portal'/>
        <Button onClick={handleSplatFetch}>Fetch</Button>
      </div>
    </>
  )
}

export default SplatProp
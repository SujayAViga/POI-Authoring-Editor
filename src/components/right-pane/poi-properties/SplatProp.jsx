import React, { useState } from 'react'
import Transforms from '../Transforms'
import { Button } from 'react-bootstrap'

function SplatProp({setSplatUrl,objectId}) {
  const [splatLocalUrl, setSplatLocalUrl] = useState('')
  const [objectKey, setObjectKey] = useState()
  const handleSplatFetch = () =>{
    setSplatUrl(splatLocalUrl);
    setObjectKey(objectId);
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



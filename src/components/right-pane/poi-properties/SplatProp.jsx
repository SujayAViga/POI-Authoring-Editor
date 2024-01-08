import React, { useContext, useEffect, useState } from 'react'
import Transforms from '../Transforms'
import { Button } from 'react-bootstrap'
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import axios from 'axios';
import { useProperties } from '../../three-components/PropertiesProvider';

function SplatProp() {
  const { objectId} = useContext(SelectedObjectContext);
  const [splatLocalUrl, setSplatLocalUrl] = useState('');
  const {properties,setProperties} = useProperties()

  useEffect(()=>{
    setSplatLocalUrl(properties[objectId].url)
  },[properties])

  const handleSplatFetch = () =>{
    // fetchDataFromPoi()
  }
  
  const handleSplatUpdate = () =>{
    // store previous values of "properties" array
    const updatedProperties = [...properties];
    // update url 
    updatedProperties[objectId].url = splatLocalUrl;
    // set the updated properties as properties
    setProperties(updatedProperties);
  }
  
  const handleUrlChange = (e) => {
    setSplatLocalUrl(e.target.value)
  };
  
  return (
    <>
      <Transforms transforms = {properties[objectId]}/>
      <div className='property-container'>
        <h4>Splat Property</h4>
        <input placeholder="Locale"/>
        <input placeholder='Splat url' value={splatLocalUrl} onChange={handleUrlChange}/>
        <input placeholder='Exit portal'/>
        <input placeholder='Entry portal'/>
        <Button onClick={handleSplatFetch}>Fetch</Button>
        <Button onClick={handleSplatUpdate}>Update</Button>
      </div>
    </>
  )
}

export default SplatProp



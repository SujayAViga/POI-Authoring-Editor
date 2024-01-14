import React, { useContext, useEffect, useState } from 'react'
import Transforms from '../Transforms'
import { useProperties } from '../../three-components/PropertiesProvider'
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import { Button } from 'react-bootstrap';

function CesiumProp() {
  const { objectId} = useContext(SelectedObjectContext);
  const {properties,setProperties} = useProperties()
  const [localAssetID, setLocalAssetID] = useState('')
  const [localToken, setLocalToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZjk1OTU2My1mNDBhLTQzYzEtOTcxMS01MzNiOWIxMDZiYTMiLCJpZCI6MTY2MDkxLCJpYXQiOjE2OTQ1NDMyOTN9.rHxFqNMZ26EFHwHYUJ-xW0fDZtjamHXiM-4HR6YIHXY')

  useEffect(()=>{
    setLocalAssetID(properties[objectId].assetID)
  },[properties])

  const handleSplatUpdate = () =>{
    // store previous values of "properties" array
    const updatedProperties = [...properties];
    // update url 
    updatedProperties[objectId].assetID = localAssetID;
    // set the updated properties as properties
    setProperties(updatedProperties);
  }

  const handleAssetIDChange = (e) =>{
    setLocalAssetID(e.target.value)
  }
  const handleTokenChange = (e) =>{
    setLocalToken(e.target.value)
  }

  return (
    <>
      <Transforms transforms={properties[objectId]}/>
      <div className='property-container'>
        <h4>Cesium Asset Prop</h4>
        example id : 2342663<br/>
        <label>Asset ID</label>
        <input placeholder='Asset ID' value={localAssetID} onChange={handleAssetIDChange}/>
        <label>Access token</label>
        <input placeholder='Ion Token' value={localToken} onChange={handleTokenChange}/>
        <Button onClick={handleSplatUpdate}>Update</Button>
        
      </div>
    </>
  )
}

export default CesiumProp
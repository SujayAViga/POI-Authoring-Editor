import React, { useContext, useEffect, useRef, useState } from 'react'
import Transforms from '../Transforms'
import { Button } from 'react-bootstrap'
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import { useProperties } from '../../three-components/PropertiesProvider';

function SplatProp() {
  const { objectId,authToken,api,mapId,createNewPoiData,poiData,setPoiData,mapData,updatePoiData,fetchPoiData,fetchDataFromAssets,addDataToAsset,updateAssetData} = useContext(SelectedObjectContext);
  const [splatLocalUrl, setSplatLocalUrl] = useState('');
  const {properties,setProperties} = useProperties()
  const [assetData, setAssetData] = useState()
  const [updatedPoiData, setUpdatedPoiData] = useState(null)
  const assetCreated = useRef(false)

  useEffect(()=>{
    console.log("cyr",properties[objectId]);
  },[])

  useEffect(()=>{
    setSplatLocalUrl(properties[objectId].url)

    setUpdatedPoiData(
      {
        mapId: mapId,
        POIId: properties[objectId].poiId,
        type: "9",
        location: {
          x: properties[objectId].location.x,
          y: properties[objectId].location.y,
          z: properties[objectId].location.z
        },
        rotation: {
          x: properties[objectId].rotation.x,
          y: properties[objectId].rotation.y,
          z: properties[objectId].rotation.z,
          w: 35.56
        },
        scale: {
          x: properties[objectId].scale.x,
          y: properties[objectId].scale.y,
          z: properties[objectId].scale.z,
        },
        tags: [
          "123",
          "tag1",
          "tag2"
        ]
      }
    )
    
    setAssetData({
      mapId: mapId,
      POIId: properties[objectId].poiId,
      language: "english",
      URL: properties[objectId].url,
      text: "this is an example text",
      exitPortalPosition: {
        x: properties[objectId].location.x,
        y: properties[objectId].location.y,
        z: properties[objectId].location.z
      },
      exitPortalRotation: {
        x: properties[objectId].rotation.x,
        y: properties[objectId].rotation.y,
        z: properties[objectId].rotation.z,
        w: 0.4
      },
      exitPortalScale: {
        x: 1.5,
        y: 1.5,
        z: 1.5
      },
      exitPortalText: "string",
      splatBoundaryCenter: {
        x: 0,
        y: 0,
        z: 0
      },
      splatBoundaryRadius: 0,
      splatBoundaryWidth: 0,
      splatBoundaryHeight: 0,
      splatBoundaryLength: 0
    })
  },[properties])

  useEffect(()=>{
    // create asset if not else update the existing asset
    if(assetData && !properties[objectId].assetCreated){
      if(authToken){
        addDataToAsset(assetData).then(()=>{
          properties[objectId].assetCreated = true
        })
      }
      
    }else if(assetData && properties[objectId].assetCreated){
      if(updatedPoiData){
        updatePoiData(updatedPoiData).then(()=>{
          updateAssetData(assetData).then(()=>{
            fetchPoiData(mapId).then(()=>{
              fetchDataFromAssets(mapId,properties[objectId].poiId)
            })
          })
        })
      }
    }
    
  },[assetData])

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
        {/* <Button onClick={handleSplatFetch}>Fetch</Button> */}
        <Button onClick={handleSplatUpdate}>Update</Button>
      </div>
    </>
  )
}

export default SplatProp



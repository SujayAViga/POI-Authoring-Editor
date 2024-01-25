import React, { useContext, useEffect, useRef, useState } from 'react'
import Transforms from '../Transforms'
import { Button } from 'react-bootstrap'
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import { useProperties } from '../../three-components/PropertiesProvider';

function SplatProp() {
  const { objectId,setAutoSave,autoSave,authToken,api,mapId,createNewPoiData,poiData,setPoiData,mapData,updatePoiData,fetchPoiData,fetchDataFromAssets,addDataToAsset,updateAssetData} = useContext(SelectedObjectContext);
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
      }
    )
    
    
    if(properties[objectId].url){
      setAssetData({
        mapId: mapId,
        POIId: properties[objectId].poiId,
        language: properties[objectId].locale,
        URL: properties[objectId].url,
      })
    }else{
      setAssetData({
        mapId: mapId,
        POIId: properties[objectId].poiId,
        language: properties[objectId].locale,
      })
    }
    
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
      console.log(autoSave);
      if(updatedPoiData && autoSave){
        updatePoiData(updatedPoiData).then(()=>{
          updateAssetData(assetData).then(()=>{
            fetchPoiData(mapId).then(()=>{
              fetchDataFromAssets(mapId,properties[objectId].poiId)
            })
          })
        })
      }
      setAutoSave(false)
    }
    
  })

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
        <input placeholder="Locale" value={properties[objectId].locale} onChange={console.log()}/>
        <input placeholder='Splat url' value={splatLocalUrl} onChange={handleUrlChange}/>
        <Button onClick={handleSplatUpdate}>Update</Button>
      </div>
    </>
  )
}

export default SplatProp



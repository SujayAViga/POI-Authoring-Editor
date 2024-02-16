import React, { useContext, useEffect, useState } from 'react'
import Transforms from '../Transforms'
import { useProperties } from '../../three-components/PropertiesProvider';
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import { Button } from 'react-bootstrap';
import './Properties.css'

function StaticGlbProp() {
  const {autoSaveData,autoSave,objectId,authToken,api,mapId,createNewPoiData,poiData,setPoiData,mapData,updatePoiData,fetchPoiData,fetchDataFromAssets,addDataToAsset,updateAssetData} = useContext(SelectedObjectContext);
  const {properties,setProperties} = useProperties()
  const [localUrl, setLocalUrl] = useState('')
  const [assetData, setAssetData] = useState()
  const [updatedPoiData, setUpdatedPoiData] = useState(null)

  // https://huggingface.co/datasets/sujayA7299/Splat-data/resolve/main/collider.glb

  useEffect(()=>{
    setLocalUrl(properties[objectId].url)
  },[])


  //  update POI data to post to /poi and
  //  asset data to post to /asset
  useEffect(()=>{    
    setUpdatedPoiData(
      {
        mapId: mapId,
        POIId: properties[objectId].poiId,
        type: "3",
        location: {
          x: properties[objectId].location.x,
          y: properties[objectId].location.y,
          z: properties[objectId].location.z
        },
        rotation: {
          x: properties[objectId].rotation.x,
          y: properties[objectId].rotation.y,
          z: properties[objectId].rotation.z,
          w: properties[objectId].rotation.w
        },
        scale: {
          x: properties[objectId].scale.x,
          y: properties[objectId].scale.y,
          z: properties[objectId].scale.z,
        },
      }
    )
    
      setAssetData({
        mapId: mapId,
        POIId: properties[objectId].poiId,
        URL: localUrl,
        language: properties[objectId].locale,
      })
    
    console.log(properties[objectId].assetCreated);
  },[properties,localUrl])
  
 

  
  useEffect(()=>{
    // create asset if not else update the existing asset
    if(assetData && properties[objectId].poiId && !properties[objectId].assetCreated){
      if(authToken){
        console.log(assetData);
        addDataToAsset(assetData)
      }
      
    }else if(assetData && properties[objectId].poiId && properties[objectId].assetCreated){
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
    
  },[autoSave])
  
  const handleUpdate = () =>{
    // store previous values of "properties" array
    const updatedProperties = [...properties];
    // update url
    updatedProperties[objectId].url = localUrl;

    // set the updated properties as properties
    setProperties(updatedProperties);
    autoSaveData()
  }

  const handleUrlChange = (e) =>{
    setLocalUrl(e.target.value)
  }
  
  
  return (
    <>
      <Transforms transforms={properties[objectId]}/>
      <div className='property-container'>
        <h4>Static Glb Prop</h4>
        
        <input value={localUrl} placeholder='Glb Url' onChange={handleUrlChange}/>
        <button className="button" onClick={handleUpdate}>Update</button>
      </div>
    </>
  )
}

export default StaticGlbProp
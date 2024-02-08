import React, { useContext, useEffect, useRef, useState } from 'react'
import Transforms from '../Transforms'
import { Button } from 'react-bootstrap'
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import { useProperties } from '../../three-components/PropertiesProvider';

function SplatProp() {
  const {autoSaveData,objectId,autoSave,authToken,api,mapId,createNewPoiData,poiData,setPoiData,mapData,updatePoiData,fetchPoiData,fetchDataFromAssets,addDataToAsset,updateAssetData} = useContext(SelectedObjectContext);
  const {properties,setProperties} = useProperties();

  const [splatLocalUrl, setSplatLocalUrl] = useState('');
  const [localLang, setLocalLang] = useState('')
  
  const [assetData, setAssetData] = useState()
  const [updatedPoiData, setUpdatedPoiData] = useState(null)
  const assetCreated = useRef(false)

  useEffect(()=>{
    setSplatLocalUrl(properties[objectId].url)
  },[])

  //  update POI data to post to /poi and
  //  asset data to post to /asset
  useEffect(()=>{
    
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
          w: properties[objectId].rotation.w
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
        URL: splatLocalUrl,
      })
    }else{
      setAssetData({
        mapId: mapId,
        POIId: properties[objectId].poiId,
        language: properties[objectId].locale,
      })
    }
    console.log(properties[objectId].assetCreated);
  },[properties,splatLocalUrl])


  useEffect(()=>{
    console.log(objectId);
    // create asset if not else update the existing asset
    if(assetData && !properties[objectId].assetCreated){
      if(authToken){
        console.log(assetData);
        addDataToAsset(assetData)
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
    
  },[autoSave])

  const handleUpdate = () =>{
    // store previous values of "properties" array
    const updatedProperties = [...properties];
    // update url 
    updatedProperties[objectId].url = splatLocalUrl;
    // set the updated properties as properties
    setProperties(updatedProperties);
    autoSaveData()
  }


  const handleUrlChange = (e) => {
    setSplatLocalUrl(e.target.value)
  };

  
  return (
    <>
      <Transforms transforms = {properties[objectId]}/>
      <div className='property-container'>
        <h4>Splat Property</h4>
        <input placeholder="Locale" value={localLang} onChange={(e)=>setLocalLang(e.target.value)}/>
        <input placeholder='Splat url' value={splatLocalUrl} onChange={handleUrlChange}/>
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </>
  )
}

export default SplatProp



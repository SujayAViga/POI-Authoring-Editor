import React, { useContext, useEffect, useRef, useState } from 'react'
import Transforms from '../Transforms'
import { Button } from 'react-bootstrap'
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import { useProperties } from '../../three-components/PropertiesProvider';
import './Properties.css'


{/* https://huggingface.co/datasets/sujayA7299/Splat-data/resolve/main/empty.splat */}
{/* https://huggingface.co/datasets/sujayA7299/Splat-data/resolve/main/panelroom.splat */}
{/* https://huggingface.co/cakewalk/splat-data/resolve/main/train.splat */}

function SplatProp() {
  const {autoSaveData,objectId,autoSave,authToken,api,mapId,createNewPoiData,poiData,setPoiData,mapData,updatePoiData,fetchPoiData,fetchDataFromAssets,addDataToAsset,updateAssetData} = useContext(SelectedObjectContext);
  const {properties,setProperties} = useProperties();

  const [splatLocalUrl, setSplatLocalUrl] = useState('');
  const [localLang, setLocalLang] = useState('')
  
  const [assetData, setAssetData] = useState()
  const [updatedPoiData, setUpdatedPoiData] = useState(null)

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
    
    

      setAssetData({
        mapId: mapId,
        POIId: properties[objectId].poiId,
        language: properties[objectId].locale,
        URL: splatLocalUrl,
      })
    
    console.log(properties[objectId].assetCreated);
  },[properties,splatLocalUrl])


  useEffect(()=>{
    console.log(properties[objectId].assetCreated);
    // create asset if not else update the existing asset
    if(assetData && !properties[objectId].assetCreated){
      if(authToken){
        console.log(assetData);
        addDataToAsset(assetData)
      }
      
    }else if(assetData && properties[objectId].poiId && properties[objectId].assetCreated){
      console.log("update");
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
        <button className="button" onClick={handleUpdate}>Update</button>
      </div>
    </>
  )
}

export default SplatProp



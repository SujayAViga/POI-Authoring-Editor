import React, { useContext, useEffect, useRef, useState } from 'react'
import Transforms from '../Transforms'
import { useProperties } from '../../three-components/PropertiesProvider'
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import { Button } from 'react-bootstrap';
import './Properties.css'

function PortalProp() {
  const {autoSaveData,autoSave,objectId,authToken,api,mapId,createNewPoiData,poiData,setPoiData,mapData,updatePoiData,fetchPoiData,fetchDataFromAssets,addDataToAsset,updateAssetData} = useContext(SelectedObjectContext);
  const {properties,setProperties} = useProperties()

  // to be edited
  const [assetData, setAssetData] = useState()
  const [updatedPoiData, setUpdatedPoiData] = useState(null)
  
  const [exitX, setExitX] = useState(0)
  const [exitY, setExitY] = useState(0)
  const [exitZ, setExitZ] = useState(0)

  useEffect(()=>{
    setExitX(properties[objectId].exitLocation.x)
    setExitY(properties[objectId].exitLocation.y)
    setExitZ(properties[objectId].exitLocation.z)
  },[])

  useEffect(()=>{
    // console.log("Updated Properties");
    
    // set portal's transform
    setUpdatedPoiData(
      {
        mapId: mapId,
        POIId: properties[objectId].poiId,
        type: "10",
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
    
    // set exit location
    setAssetData({
      mapId: mapId,
      POIId: properties[objectId].poiId,
      exitPortalPosition: {
        x: exitX,
        y: exitY,
        z: exitZ
      },
    })
  },[properties,exitX,exitY,exitZ,objectId])

  useEffect(()=>{
    // create asset if not else update the existing asset
    if(assetData && properties[objectId].poiId && !properties[objectId].assetCreated){
      if(authToken){
        console.log(assetData);
        addDataToAsset(assetData)
      }
      
    }else if(assetData && properties[objectId].poiId && !properties[objectId].assetCreated){
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
    updatedProperties[objectId].exitLocation.x = exitX;
    updatedProperties[objectId].exitLocation.y = exitY;
    updatedProperties[objectId].exitLocation.z = exitZ;

    // set the updated properties as properties
    setProperties(updatedProperties);
    autoSaveData()
  }

  return (
    <>
    <Transforms transforms={properties[objectId]}/> 
    <div className='property-container'>
      <h4>Portal Prop</h4>
      <h4>Exit Position</h4>
      <input type='number' value={exitX} style={{width:'30%',textAlign:'center', marginLeft:'2%'}} onChange={(e)=>{setExitX(e.target.value)}} placeholder='X'/>
      <input type='number' value={exitY} style={{width:'30%',textAlign:'center', marginLeft:'2%'}} onChange={(e)=>{setExitY(e.target.value)}} placeholder='Y'/>
      <input type='number' value={exitZ} style={{width:'30%',textAlign:'center', marginLeft:'2%'}} onChange={(e)=>{setExitZ(e.target.value)}} placeholder='Z'/>
      <button className="button" onClick={handleUpdate}>Update</button>
    </div>
  </>
  )
}

export default PortalProp
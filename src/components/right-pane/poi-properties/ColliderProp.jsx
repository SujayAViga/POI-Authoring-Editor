import React, { useContext, useEffect, useState } from 'react'
import ColliderElement from './ColliderElement';
import { useGameObjects } from '../../three-components/GameObjectsProvider';
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import BoxCollider from '../../poi-assets/BoxCollider';
import { createNewProperties } from '../../left-pane/propertiesUtils';
import { useProperties } from '../../three-components/PropertiesProvider';
import { Splat } from '@react-three/drei';
import './Properties.css'
import Transforms from '../Transforms';

function ColliderProp() {
  const {autoSaveData,objectId,autoSave,authToken,api,mapId,createNewPoiData,poiData,setPoiData,mapData,updatePoiData,fetchPoiData,fetchDataFromAssets,addDataToAsset,updateAssetData} = useContext(SelectedObjectContext);
  const {properties,setProperties} = useProperties();
  const [updatedPoiData, setUpdatedPoiData] = useState(null)
  const [assetData, setAssetData] = useState()

  
  useEffect(()=>{
    console.log(objectId);
    setUpdatedPoiData(
      {
        mapId: mapId,
        POIId: properties[objectId].poiId,
        type: "5",
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
    })
    
    console.log(properties[objectId].assetCreated);
  },[properties])

  
  useEffect(()=>{
    console.log(properties[objectId].assetCreated);
    console.log(assetData);
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


  return (
    <>
      <Transforms transforms = {properties[objectId]}/>
    </>
  )
}

export default ColliderProp
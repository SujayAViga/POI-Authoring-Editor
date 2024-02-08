import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider';
import { useGameObjects } from '../three-components/GameObjectsProvider';
import { useProperties } from '../three-components/PropertiesProvider';

const Poi = ({ poiName,poiType,objectId,locale }) => {
  const { setSelectedObject,setObjectId,fetchPoiData,mapId,poiData } = useContext(SelectedObjectContext);
  const {properties} = useProperties()

  // fetch map 
  useEffect(()=>{
    fetchPoiData(mapId).then(()=>{
      properties[objectId-1].poiId = poiData[objectId-1].POIId
    })
  },[])

  const handleObjectSelection = () => {
    setSelectedObject({poiType,poiName,locale});
    console.log(properties[objectId-1].poiId);
    setObjectId(objectId-1)    
  };

  const poitype = {
    "1": "VV",
    "2": "Cesium",
    "3": "GLB",
    "4": "Animated GLB",
    "5": "Image",
    "6": "Video",
    "7": "Text",
    "8": "Audio",
    "9": "Splat",
    "10": "Portal"
  }
    return (
      <div className='property-container'>
        <button className='button' onClick={handleObjectSelection}>{poiName}({poitype[poiType]})</button>
      </div>
    );
  };
export default Poi
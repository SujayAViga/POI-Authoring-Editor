import React, { useContext, useEffect, useState } from 'react'
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import BoxCollider from '../../poi-assets/BoxCollider';
import { useProperties } from '../../three-components/PropertiesProvider';
import { useGameObjects } from '../../three-components/GameObjectsProvider';
import { createNewProperties } from '../../left-pane/propertiesUtils';

function ColliderElement({objectId}) {
  const { setSelectedObject,setObjectId,fetchPoiData,mapId,poiData,locale } = useContext(SelectedObjectContext);
  const {properties} = useProperties()


  // fetch map 
  useEffect(()=>{
    fetchPoiData(mapId).then(()=>{
      if(poiData){
        console.log(objectId-1);
        console.log(poiData[objectId-1].POIId);
        properties[objectId-1].poiId = poiData[objectId-1].POIId
      }
        
    })
    console.log("new Collider");
  },[])

  const poiType = "5"
  const poiName = "Collider"
  const handleObjectSelection = () => {
    setSelectedObject({poiType,poiName,locale});
    console.log(objectId-1);
    console.log(properties);
    setObjectId(objectId-1);
  };

  return (
    <div className='property-container'>
        <button className='button' onClick={handleObjectSelection}>Collider</button>
    </div>
  )
}

export default ColliderElement
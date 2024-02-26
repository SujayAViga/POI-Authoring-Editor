import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider';
import { useGameObjects } from '../three-components/GameObjectsProvider';
import { useProperties } from '../three-components/PropertiesProvider';
import ColliderElement from '../right-pane/poi-properties/ColliderElement';

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
    "5": "Collider",
    "6": "Video",
    "7": "Text",
    "8": "Audio",
    "9": "Splat",
    "10": "Portal",
    "11": "Info Panel"
  }

  const [colliders, setColliders] = React.useState([]);

  const handleAddCollider = () => {
    setColliders([...colliders, <ColliderElement key={colliders.length} />]);
  };

  const [isCollapsed, setIsCollapsed] = React.useState(true); // Initially collapsed

  const handleCollapse = () =>{
    setIsCollapsed(!isCollapsed);

  }

    return (
      <div className='property-container'>
        {poitype[poiType]==="Splat" && 
        <>
          <button className='button' onClick={handleCollapse}>{isCollapsed ? '>' : 'v'}</button>
          <button className='button' onClick={handleObjectSelection}>{poiName}({poitype[poiType]})</button>
          <button onClick={handleAddCollider}>+</button>
          <ul style={{ display: isCollapsed ? 'none' : 'block',listStyleType: 'none'  }}>
            {/* Render the list of collider components */}
            {colliders.map((collider) => (
              <li key={collider.key}>{collider}</li>
            ))}
          </ul>
        </>
      }
      {poitype[poiType]!=="Splat" &&
        <button className='button' onClick={handleObjectSelection}>{poiName}({poitype[poiType]})</button>
      }
      </div>
    );
  };
export default Poi
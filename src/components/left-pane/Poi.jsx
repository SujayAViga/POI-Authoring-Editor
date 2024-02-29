import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider';
import { useGameObjects } from '../three-components/GameObjectsProvider';
import { useProperties } from '../three-components/PropertiesProvider';
import ColliderElement from '../right-pane/poi-properties/ColliderElement';
import AddCollider from './AddCollider';

const Poi = ({ poiName,poiType,objectId,locale }) => {
  const { setSelectedObject,setObjectId,fetchPoiData,mapId,poiData } = useContext(SelectedObjectContext);
  const {properties} = useProperties()
  const {gameObjects} = useGameObjects()

  // fetch map and assign poi ID to the poi element in heirarchy
  useEffect(()=>{
    fetchPoiData(mapId).then(()=>{
      properties[objectId-1].poiId = poiData[objectId-1].POIId
    })
  },[])

  const handleObjectSelection = () => {
    setSelectedObject({poiType,poiName,locale});
    console.log(properties[objectId-1].poiId);
    setObjectId(objectId-1)    
    console.log(properties[objectId-1].type);  
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

  
  // add collider as a child of the splat
  const [colliders, setColliders] = React.useState([]);

  const handleAddCollider = () => {
    // ColliderElement is the button in heirarchy
    setColliders([...colliders, <ColliderElement objectId={gameObjects.length} key={gameObjects.length} />]);
  };

  // show all the children of splat
  const [isCollapsed, setIsCollapsed] = React.useState(true); // Initially collapsed
  const handleCollapse = () =>{
    setIsCollapsed(!isCollapsed);

  }

    return (
      <div className='property-container'>
      
        {/* if POI is a splat */}
        {poitype[poiType]==="Splat" && 
        <>
          <button className='button' onClick={handleCollapse}>{isCollapsed ? '>' : 'v'}</button>
          <button className='button' onClick={handleObjectSelection}>{poiName}({poitype[poiType]})</button>
          <AddCollider handleAddCollider = {handleAddCollider}/>
          <ul style={{ display: isCollapsed ? 'none' : 'block',listStyleType: 'none'  }}>
            {/* Render the list of collider components */}
            {colliders.map((collider) => (
              <li key={collider.key}>{collider}</li>
            ))}
          </ul>
        </>
      }

      {/* if the POI is not a splat */}
      {poitype[poiType]!=="Splat" &&
        <button className='button' onClick={handleObjectSelection}>{poiName}({poitype[poiType]})</button>
      }
      </div>
    );
  };
export default Poi
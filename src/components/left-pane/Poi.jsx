import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider';
import { useGameObjects } from '../three-components/GameObjectsProvider';
import { useProperties } from '../three-components/PropertiesProvider';

const Poi = ({ poiName,poiType,objectId,locale }) => {
  const { setSelectedObject } = useContext(SelectedObjectContext);
  const {properties} = useProperties()
  const {gameObjects} = useGameObjects()
  const handleObjectSelection = () => {
    setSelectedObject({poiType,poiName,objectId,locale});
    console.log(gameObjects);
    console.log(properties);
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
    "9": "Splat"
  }
    return (
      <div className='property-container'>
        <button onClick={handleObjectSelection}>{poiName}({poitype[poiType]})</button>
      </div>
    );
  };
export default Poi
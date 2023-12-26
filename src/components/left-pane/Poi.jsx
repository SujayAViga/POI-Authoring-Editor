import React from 'react'
import { Link } from 'react-router-dom';

const Poi = ({ poiName,poiType,objectId }) => {
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
  const poiRoute = {
    "1": "VV",
    "2": "Cesium",
    "3": "GLB",
    "4": "AnimatedGLB",
    "5": "Image",
    "6": "Video",
    "7": "Text",
    "8": "Audio",
    "9": "Splat"
  }
    return (
      <div className='property-container'>        
        <Link to={`object${objectId}/${poiRoute[poiType]}`}><p>{poiName}({poitype[poiType]})</p></Link>
      </div>
    );
  };
export default Poi
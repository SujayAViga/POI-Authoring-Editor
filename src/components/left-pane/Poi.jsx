import React from 'react'

const Poi = ({ poiName,poiType }) => {
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
      <div>
        <p>{poiName}({poitype[poiType]})</p>
      </div>
    );
  };
export default Poi
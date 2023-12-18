import React from 'react'

const Poi = ({ poiName,poiType }) => {
  
    return (
      <div>
        <p>{poiName}({poiType})</p>
      </div>
    );
  };
export default Poi
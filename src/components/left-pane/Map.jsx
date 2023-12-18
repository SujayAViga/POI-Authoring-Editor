import React,{useState} from 'react'
import Poi from './Poi';
import './Map.css'
import CreatePoi from './CreatePoi';


const Map = ({ onAddPoi }) => {
    const [pois, setPois] = useState([]);
    const [isCreatePoiModalOpen, setCreatePoiModalOpen] = useState(false);
    const [poiName, setPoiName] = useState('')
    const [poiType, setPoiType] = useState(null)


    const handleAddPoi = () => {
      setPois((prevMaps) => [...prevMaps, <Poi key={prevMaps.length} />]);
    };

    const handleOpenCreatePoiModal = () => {
      setCreatePoiModalOpen(true);
    };

    const handleCloseCreatePoiModal = () => {
      setCreatePoiModalOpen(false);
      console.log(poiName);
      console.log(poiType);
    };
    
      return (
        <div className='map-container'>
          <p>Map Component</p>
          <button onClick={handleOpenCreatePoiModal}>Add POI</button>
          {/* <button onClick={handleOpenCreatePoiModal}>Open Create POI Modal</button> */}

          {/* Render the CreatePoi modal if it's open */}
          {isCreatePoiModalOpen &&
           <CreatePoi 
            onClose={handleCloseCreatePoiModal}
            poiName={poiName}
            setPoiName={setPoiName}
            poiType={poiType}
            setPoiType={setPoiType} />}

          {pois}
        </div>
      );
    };

export default Map
import React,{useContext, useEffect, useState} from 'react'
import Poi from './Poi';
import './Map.css'
import CreatePoi from './CreatePoi';
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider';
import { useGameObjects } from '../three-components/GameObjectsProvider';


const Map = ({ mapName }) => {
    const {locale,maps} = useContext(SelectedObjectContext)
    const {gameObjects} = useGameObjects()
    const [pois, setPois] = useState([]);
    const [isCreatePoiModalOpen, setCreatePoiModalOpen] = useState(false);
    const [poiName, setPoiName] = useState('')
    const [poiType, setPoiType] = useState(null)

    useEffect(()=>{
      console.log('new maps',maps);
    },[maps])

    const handleAddPoi = () => {
      setPois((prevMaps) => [...prevMaps, <Poi locale={locale} objectId={gameObjects.length} poiName={poiName} poiType={poiType} key={prevMaps.length} />]);
      
    };

    const handleOpenCreatePoiModal = () => {
      setCreatePoiModalOpen(true);
    };

    const handleCloseCreatePoiModal = () => {
      setCreatePoiModalOpen(false);
      if(poiName!=='' && poiType!==null){
        handleAddPoi()
        setPoiName('')
        setPoiType(null)
      }else{
        alert('Enter Poi Name and Type')
        setPoiName('')
        setPoiType(null)
      }
    
    };
    
      return (
        <div className='map-container'>
          <h3>{mapName}</h3>
          <button onClick={handleOpenCreatePoiModal}>Create POI</button>
         
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
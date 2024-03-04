import React,{useContext, useEffect, useState} from 'react'
import Poi from './Poi';
import './Map.css'
import CreatePoi from './CreatePoi';
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider';
import { useGameObjects } from '../three-components/GameObjectsProvider';


const Map = ({ mapName }) => {
    const {locale,mapData,poiData,setPoiData,mapId,deletePoiData,firstRender,fetchDataFromMap,previousPoiIDs, setPreviousPoiIDs} = useContext(SelectedObjectContext)
    const {gameObjects} = useGameObjects()
    const [pois, setPois] = useState([]);
    const [isCreatePoiModalOpen, setCreatePoiModalOpen] = useState(false);
    const [poiName, setPoiName] = useState('')
    const [poiType, setPoiType] = useState(null)

    // load pois from map
    useEffect(()=>{
      if(mapData){
        console.log('new mapData',mapData);
        setPreviousPoiIDs(mapData.data[1].POI)
      }
    },[])


    // delete all the pois on first load
    useEffect(()=>{     
      const deleteAllPoiData = async () => {
        try {
          if (previousPoiIDs) {
            // wait for each promise to complete
            const deletePromises = previousPoiIDs.map((element) => deletePoiData(mapId, element));
            await Promise.all(deletePromises);
            // Continue with any logic after all deletes are done
          }
        } catch (error) {
          console.error('Error deleting Poi data:', error.message);
        }
      };
      // Run only on the first render and delete previous pois to have an empty poi list
      if (firstRender.current) {
        deleteAllPoiData();
        // firstRender is set to false in deletePoiData()
      }
    },[previousPoiIDs])


    
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
          <h3 style={{color:'white'}}>{mapName}</h3>
          <button className='button' onClick={handleOpenCreatePoiModal}>Create POI</button>
         
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
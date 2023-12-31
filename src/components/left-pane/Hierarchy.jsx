import React,{useContext, useState} from 'react'
import UserDetails from './UserDetails'
import Map from './Map';
import './Hierarchy.css'
import CreateMap from './CreateMap';
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider';


function Hierarchy() {
  const { setSelectedObject } = useContext(SelectedObjectContext);
  const [maps, setMaps] = useState([]);

  const [isCreateMapModalOpen, setCreateMapModalOpen] = useState(false);
  const [mapName, setMapName] = useState('')


  const handleAddMap = () => {
    setMaps((prevMaps) => [...prevMaps, <Map mapName={mapName} key={prevMaps.length} />]);
  };

  const handleOpenCreateMapModal = () => {
    setCreateMapModalOpen(true);
  };

  const handleCloseCreateMapModal = () => {
    setCreateMapModalOpen(false);
    if(mapName!==""){
      handleAddMap()
      setMapName('')
    }else{
      alert("Enter a Map name")
    }
    
  };
  

  return (
    <div className='hierarchy-container' >
      <UserDetails/>
      <div className='gameobject-container'>
        <button onClick={handleOpenCreateMapModal}>Create Map</button>

        {isCreateMapModalOpen &&
           <CreateMap 
            onClose={handleCloseCreateMapModal}
            mapName={mapName}
            setMapName={setMapName}/>}
        {maps}
      </div>
      <button className='save-button' >Save</button>
    </div>
  )
}

export default Hierarchy
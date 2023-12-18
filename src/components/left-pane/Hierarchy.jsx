import React,{useState} from 'react'
import UserDetails from './UserDetails'
import Map from './Map';
import './Hierarchy.css'


function Hierarchy() {
  const [maps, setMaps] = useState([]);

  const handleAddMap = () => {
    setMaps((prevMaps) => [...prevMaps, <Map key={prevMaps.length} />]);
  };

  

  return (
    <div className='hierarchy-container' >
      <UserDetails/>
      <div className='gameobject-container'>
        <button onClick={handleAddMap}>Add Map</button>
        {maps}
      </div>
      <button className='save-button' >Save</button>
    </div>
  )
}

export default Hierarchy
// CreatePoi.js
import React, { useContext, useEffect, useState } from 'react';
import './CreatePoi.css';
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider';
import { useFrame } from '@react-three/fiber';

function CreateMap({onClose,setMapName}) {
    const {authToken,api,maps,setMaps} = useContext(SelectedObjectContext);
    const [localMaps, setLocalMaps] = useState(null)

    useEffect(()=>{
      console.log("maps",localMaps);
      fetchDataFromMap()
    },[maps])


    const handleAddMap = () => {
        onClose(); // Close the modal
        // console.log('a',a);
        // fetchDataFromMap()
    };
    
    const fetchDataFromMap = async () => {
        try {
          const response = await api.get('map/', {
            headers: {
              Authorization: `Bearer ${authToken}`, 
            },
          });
          // Handle the response here
          // console.log('Data from /map/:', response.data);
          setMaps(response.data);
          // a = response.data
        } catch (error) {
          // Handle errors here
          console.error('Failed to fetch data from /map/:', error.message);
        }
      };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>
                &times;
                </span>
                <h2 style={{color:'black'}}>Create Map</h2>
                <input placeholder='Map Name' onChange={(e)=>{setMapName(e.target.value)}}/>
                <button className='button' onClick={handleAddMap} type='submit'>Create</button>
            </div>
        </div>
    );
}

export default CreateMap;

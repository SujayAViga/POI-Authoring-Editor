// CreatePoi.js
import React, { useContext, useEffect, useState } from 'react';
import './CreatePoi.css';
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider';
import { useFrame } from '@react-three/fiber';

function CreateMap({onClose,setMapName}) {
    const {authToken,api,fetchDataFromMap} = useContext(SelectedObjectContext);
    const [localMaps, setLocalMaps] = useState(null)
    const [localMapName, setLocalMapName] = useState()

    useEffect(()=>{
      if(authToken){
        fetchDataFromMap()
      }
      
    },[authToken])


    const handleAddMap = () => {
        // fetchDataFromMap().then(()=>{
          onClose()
        // })
    };

    const addDataToMap = async () => {
      try {
        const response = await api.post(
          'map/',
          {
            mapName:localMapName
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json', // Add this line
            },
          }
        );
        console.log("Posted poi data successfully", response.status);
      } catch (error) {
        console.error('Failed to post data to /poi/', error.message);
      }
    };
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>
                &times;
                </span>
                <h2 style={{color:'black'}}>Create Map</h2>
                <input placeholder='Map Name' onChange={(e)=>{setMapName(e.target.value);setLocalMapName(e.target.value)}}/>
                <button className='button' onClick={handleAddMap} type='submit'>Create</button>
            </div>
        </div>
    );
}

export default CreateMap;

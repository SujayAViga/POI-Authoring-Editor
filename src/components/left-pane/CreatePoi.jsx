// CreatePoi.js
import React, { useContext, useState } from 'react';
import './CreatePoi.css';
import Form from 'react-bootstrap/Form';

import { useGameObjects } from '../three-components/GameObjectsProvider';
import { useProperties } from '../three-components/PropertiesProvider';

import { SelectedObjectContext } from '../three-components/SelectedObjectProvider';
import { createNewProperties } from './propertiesUtils';

import { Gltf, Splat } from '@react-three/drei';
import Cesium from '../poi-assets/Cesium';

import SplatProp from '../right-pane/poi-properties/SplatProp';
import CesiumProp from '../right-pane/poi-properties/CesiumProp';
import { CuboidCollider, RigidBody,Physics } from "@react-three/rapier";

function CreatePoi({onClose,setPoiName,setPoiType}) {
    const {setObjectId,api,authToken,splatUrls} = useContext(SelectedObjectContext)
    const [poiTypeLocal, setPoiTypeLocal] = useState(null)


    const {gameObjects,setGameObjects} = useGameObjects(0)
    // get ref to global array that stores all game object properties
    const {properties, setProperties} = useProperties()
    // add new properties of game objects to the array
    const handleAddProperties = () => {
      const newProperties = createNewProperties(poiTypeLocal,properties)
      setProperties((prevInstances) => [...prevInstances, newProperties]);
  };

    const handleAddPoi = () => {
        createGameobject()
        handleAddProperties()
        onClose(); // Close the modal
    };

    const addDataToPoi = async () => {
        try {
          const response = await api.post(
            'poi/',
            updatedPoiData,
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

      
    //   https://huggingface.co/cakewalk/splat-data/resolve/main/nike.splat

    let newGameObject,newProperty;
    const createGameobject = () =>{
        if(poiTypeLocal==='9'){
            setObjectId(gameObjects.length)
            newGameObject = <Splat src={splatUrls} key={gameObjects.length} objectId={gameObjects.length}/>; // You can use a key to ensure uniqueness
            // newProperty = <SplatProp url={splatUrls} key={gameObjects.length} objectId={gameObjects.length}/>
        }
        else if(poiTypeLocal=='2'){
            setObjectId(gameObjects.length)
            newGameObject = <Cesium
            position={[0,0,0]}
            />
            newProperty = <CesiumProp />
        }else if(poiTypeLocal=='3'){
          setObjectId(gameObjects.length)
          newGameObject = <Gltf />
          
          newProperty = <CesiumProp />
      }
        
        // Update the gameObjects array with the newSplat
        setProperties((prevProperties)=>[...prevProperties],newProperty)
        setGameObjects((prevGameObjects) => [...prevGameObjects, newGameObject]);
    }

    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <span className="close-button" onClick={onClose}>
            &times;
            </span>
            <h2 style={{color:'black'}}>Create POI</h2>
            <input placeholder='Poi Name' onChange={(e)=>{setPoiName(e.target.value)}}/>
            <Form.Select size='lg' style={{ width: "100%", height: "2em", padding: "1%", margin: '1%', fontSize: 16,borderRadius:5 }} onChange={(e)=>{setPoiType(e.target.value); setPoiTypeLocal(e.target.value)}}>
                <option>POI type</option>
                {/* <option value="1">Point Cloud</option> */}
                <option value="2">Cesium</option>
                <option value="3">glb/Gltf</option>
                {/* <option value="4">Animated GLB</option>
                <option value="5">Image</option>
                <option value="6">Video</option>
                <option value="7">Text</option>
                <option value="8">Audio</option> */}
                <option value="9">Splat</option>
            </Form.Select>
            <button onClick={handleAddPoi} type='submit'>Create</button>
        </div>
        </div>
    );
}

export default CreatePoi;

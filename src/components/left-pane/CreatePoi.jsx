// CreatePoi.js
import React, { useContext, useEffect, useState } from 'react';
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
import StaticGlbProp from '../right-pane/poi-properties/StaticGlbProp';

function CreatePoi({onClose,setPoiName,setPoiType}) {
    const {setObjectId,objectId,splatUrls,mapId,createNewPoiData,mapData,fetchPoiData,poiData} = useContext(SelectedObjectContext)
    const [poiTypeLocal, setPoiTypeLocal] = useState(null)
    const [newPoiData, setNewPoiData] = useState(null)

    const {gameObjects,setGameObjects} = useGameObjects()
    // get ref to global array that stores all game object properties
    const {properties, setProperties} = useProperties()

    useEffect(()=>{
      console.log("po",poiData);
    },[poiData])

    // add new properties of game objects to the array
    const handleAddProperties = () => {
      const newProperties = createNewProperties(poiTypeLocal,properties)
      // console.log(mapData);
      // newProperties.poiId = 
      setProperties((prevInstances) => [...prevInstances, newProperties]);
  };
  
  useEffect(()=>{
    if(newPoiData){
      createNewPoiData(newPoiData).then(()=>{
        console.log("new Data",newPoiData);
        fetchPoiData(mapId).then(()=>{
          onClose()
        })

      })
    }
    
  },[newPoiData])

    const handleAddPoi = () => {
        createGameobject()
        handleAddProperties()
    };
      
    let newGameObject,newProperty;
    const createGameobject = () =>{
        if(poiTypeLocal==='9'){
            setObjectId(gameObjects.length)
            newGameObject = <Splat src={splatUrls} key={gameObjects.length} objectId={gameObjects.length+1}/>; // You can use a key to ensure uniqueness
            setNewPoiData({
              mapId: mapId,
              type: 9, 
              location: {
                x: 0,
                y: 0,
                z: 0
              },
              rotation: {
                x: 0,
                y: 0,
                z: 0,
                w: 35.56
              },
              scale: {
                x: 0,
                y: 0,
                z: 0,
              },
              tags: [
                "123",
                "tag1",
                "tag2"
              ]
            })
        }
        else if(poiTypeLocal=='2'){
            setObjectId(gameObjects.length)
            newGameObject = <Cesium
            position={[0,0,0]}
            />

        }else if(poiTypeLocal=='3'){
          setObjectId(gameObjects.length)
          newGameObject = <Gltf />
      }
        
        // Update the gameObjects array with the newSplat
        // setProperties((prevProperties)=>[...prevProperties],newProperty)
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

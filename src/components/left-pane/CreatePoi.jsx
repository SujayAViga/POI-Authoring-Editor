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
import Portal from '../poi-assets/Portal';
import Label3d from '../three-components/Label3d';
import InfoPanel from '../three-components/InfoPanel';
import BoxCollider from '../poi-assets/BoxCollider';

function CreatePoi({onClose,setPoiName,setPoiType}) {
    const {setObjectId,objectId,splatUrls,mapId,createNewPoiData,mapData,fetchPoiData,poiData} = useContext(SelectedObjectContext)
    const [poiTypeLocal, setPoiTypeLocal] = useState(null)
    const [newPoiData, setNewPoiData] = useState(null)

    const {gameObjects,setGameObjects} = useGameObjects()
    // get ref to global array that stores all game object properties
    const {properties, setProperties} = useProperties()

    // add new properties of game objects to the array
    const handleAddProperties = () => {
      const newProperties = createNewProperties(poiTypeLocal,properties)
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
        // onClose()
    };
      
    let newGameObject,newProperty;
    const createGameobject = () =>{
        if(poiTypeLocal==='9'){
          // set object id
            setObjectId(gameObjects.length)
            // create new react component
            newGameObject = <Splat key={gameObjects.length} objectId={gameObjects.length}/>; // You can use a key to ensure uniqueness
            // set initial properties
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
                w: 0
              },
              scale: {
                x: 1,
                y: 1,
                z: 1,
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
        }
        
        else if(poiTypeLocal=='3'){
          setObjectId(gameObjects.length)
          newGameObject = <Gltf />
          setNewPoiData({
            mapId: mapId,
            type: 3, 
            location: {
              x: 0,
              y: 0,
              z: 0
            },
            rotation: {
              x: 0,
              y: 0,
              z: 0,
              w: 0
            },
            scale: {
              x: 1,
              y: 1,
              z: 1,
            },
            tags: [
              "123",
              "tag1",
              "tag2"
            ]
          })
        }
        else if(poiTypeLocal==='10'){
          setObjectId(gameObjects.length)
          newGameObject = <Portal />
          setNewPoiData({
            mapId: mapId,
            type:10, 
            location: {
              x: 0,
              y: 0,
              z: 0
            },
            rotation: {
              x: 0,
              y: 0,
              z: 0,
              w: 0
            },
            scale: {
              x: 1,
              y: 1,
              z: 1,
            },
            tags: [
              "123",
              "tag1",
              "tag2"
            ]
          })
        }
        else if(poiTypeLocal==='7'){
          setObjectId(gameObjects.length)
          newGameObject = <InfoPanel />
          setNewPoiData({
            mapId: mapId,
            type:7, 
            location: {
              x: 0,
              y: 0,
              z: 0
            },
            rotation: {
              x: 0,
              y: 0,
              z: 0,
              w: 0
            },
            scale: {
              x: 1,
              y: 1,
              z: 1,
            },
            tags: [
              "123",
              "tag1",
              "tag2"
            ]
          })
        }
        else if(poiTypeLocal==='5'){
          setObjectId(gameObjects.length)
          newGameObject = <BoxCollider />
          setNewPoiData({
            mapId: mapId,
            type:5, 
            location: {
              x: 0,
              y: 0,
              z: 0
            },
            rotation: {
              x: 0,
              y: 0,
              z: 0,
              w: 0
            },
            scale: {
              x: 1,
              y: 1,
              z: 1,
            },
            tags: [
              "123",
              "tag1",
              "tag2"
            ]
          })
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
                <option>Select POI type</option>
                <option value="3">Glb/Gltf</option>
                <option value="5">Collider</option>
                <option value="7">Info Panel</option>
                <option value="9">Splat</option>
                <option value="10">Portal</option>
                {/* <option value="1">Point Cloud</option> */}
                {/* <option value="2">Cesium</option> */}
                {/* <option value="4">Animated GLB</option>
                
                <option value="6">Video</option>
                <option value="8">Audio</option> */}
            </Form.Select>
            <button className='button' onClick={handleAddPoi} type='submit'>Create</button>
        </div>
        </div>
    );
}

export default CreatePoi;

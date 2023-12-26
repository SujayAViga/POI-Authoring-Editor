// CreatePoi.js
import React, { useState } from 'react';
import './CreatePoi.css';
import Form from 'react-bootstrap/Form';
import { Splat } from '@react-three/drei';
import { useGameObjects } from '../three-components/GameObjectsProvider';

function CreatePoi({onClose,setPoiName,setPoiType}) {
    const [poiTypeLocal, setPoiTypeLocal] = useState(null)

    const handleAddPoi = () => {
        createGameobject()

        onClose(); // Close the modal
    };
    const { gameObjects, setGameObjects } = useGameObjects(0);
    let newGameObject;
    const createGameobject = () =>{
        if(poiTypeLocal==='9'){
            newGameObject = <Splat src="https://huggingface.co/cakewalk/splat-data/resolve/main/garden.splat" key={gameObjects.length + 1} />; // You can use a key to ensure uniqueness
        }

        // Update the gameObjects array with the newSplat
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
                <option value="1">Point Cloud</option>
                <option value="2">Cesium</option>
                <option value="3">glb/Gltf</option>
                <option value="4">Animated GLB</option>
                <option value="5">Image</option>
                <option value="6">Video</option>
                <option value="7">Text</option>
                <option value="8">Audio</option>
                <option value="9">Splat</option>
            </Form.Select>
            <button onClick={handleAddPoi} type='submit'>Create</button>
        </div>
        </div>
    );
}

export default CreatePoi;

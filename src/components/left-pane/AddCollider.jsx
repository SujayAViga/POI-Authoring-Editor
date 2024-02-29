import React, { useContext, useEffect, useState } from 'react'
import { useProperties } from '../three-components/PropertiesProvider'
import { useGameObjects } from '../three-components/GameObjectsProvider'
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider'
import BoxCollider from '../poi-assets/BoxCollider'
import { createNewProperties } from './propertiesUtils'

function AddCollider({handleAddCollider}) {

    const {colliderList, setColliderList} = useContext(SelectedObjectContext)
    const {setObjectId,objectId,splatUrls,mapId,createNewPoiData,mapData,fetchPoiData,poiData} = useContext(SelectedObjectContext)
    const [poiTypeLocal, setPoiTypeLocal] = useState('5')
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
          handleAddCollider()
        })
        
      })
    }
    
  },[newPoiData])

    const handleAddPoi = () => {
        handleAddProperties()
        createGameobject()
        // onClose()
    };
      
    let newGameObject,newProperty;
    const createGameobject = () =>{
          // set object id
            setObjectId(gameObjects.length)
            // create new react component
            newGameObject = <BoxCollider key={gameObjects.length} objectId={gameObjects.length}/>; // You can use a key to ensure uniqueness
            // set initial properties
            setNewPoiData({
              mapId: mapId,
              type: 5, 
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
                
        // Update the gameObjects array with the newSplat
        // setProperties((prevProperties)=>[...prevProperties],newProperty)
        setGameObjects((prevGameObjects) => [...prevGameObjects, newGameObject]);
    }

    const handleDeleteCollider =()=>{
        setColliderList((prevMaps) => prevMaps.filter((element) => element.props.number !== props.number));
    }
    
  return (
    <button onClick={handleAddPoi}>+</button>
  )
}

export default AddCollider
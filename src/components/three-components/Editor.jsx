import React, { useContext, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, OrbitControls, PivotControls, Splat, TransformControls } from '@react-three/drei'
import Ground from './Ground';
import './Editor.css'
import { useGameObjects } from './GameObjectsProvider';
import { SelectedObjectContext } from './SelectedObjectProvider';
import { useProperties } from './PropertiesProvider';

function Editor() {

    const { gameObjects, setGameObjects } = useGameObjects();
    const {properties} = useProperties()

    useEffect(()=>{
      console.log("game",gameObjects);
      console.log("prop",properties);
    },[gameObjects,properties])

    const [isCtrlPressed, setIsCtrlPressed] = useState(false);
    const handleKeyDown = (event) => {
        if (event.key === 'Control') {
          setIsCtrlPressed(true);
        }
      };
  
      const handleKeyUp = (event) => {
        if (event.key === 'Control') {
          setIsCtrlPressed(false);
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);


        // Use map to iterate over both arrays simultaneously
        const combinedComponents = gameObjects.map((gameObject, index) => {
          // Assuming each element in properties corresponds to the gameObject at the same index
          const propertiesForGameObject = properties[index];
          let assetType = propertiesForGameObject.type;
          let prop = {
            key: propertiesForGameObject.id,
            // position: propertiesForGameObject.location,
            rotation: [0,Math.PI,0]
          }

          if(assetType=="splat"){
            prop.src = propertiesForGameObject.url;
            
          }else if(assetType=="audio"){
            // position:[0,0,0]
          }
      
          // Return a new React component with properties as props
          return React.cloneElement(gameObject, prop);
        });




  return (
    <>
        <Canvas>
            <CameraControls enabled ={isCtrlPressed}/>
            <Ground />
            

              {gameObjects.length> 0 && (gameObjects.map((object, index) => (
                <PivotControls key={index}>
                  {/* <Splat url="https://huggingface.co/cakewalk/splat-data/resolve/main/garden.splat"/> */}
                  {combinedComponents}
                </PivotControls>
              )))}
              {/* https://huggingface.co/cakewalk/splat-data/resolve/main/garden.splat */}
        </Canvas>
    </>
  )
}

export default Editor
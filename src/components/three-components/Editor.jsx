import React, { useContext, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, PivotControls } from '@react-three/drei'
import Ground from './Ground';
import './Editor.css'
import { useGameObjects } from './GameObjectsProvider';
import { SelectedObjectContext } from './SelectedObjectProvider';
import { useProperties } from './PropertiesProvider';

function Editor() {


    const { gameObjects, setGameObjects } = useGameObjects();
    const {properties,setProperties,testString,setTestString} = useProperties()
    const {objectId} = useContext(SelectedObjectContext)

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

      const handleDrag = (e) =>{          
          const updatedProperties = [...properties];
          console.log(e.elements);
          updatedProperties[objectId].location.x = e.elements[12]
          updatedProperties[objectId].location.y = e.elements[13]
          updatedProperties[objectId].location.z = e.elements[14]

          // Call setProperties to update the state with the modified array
          setProperties(updatedProperties);

      }
  
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

        const combinedComponents = gameObjects.map((gameObject, index) => {
          // Merge props from properties array
          const combinedProps = properties[index]
          let assetType = combinedProps.type;
          let prop = {
            key: combinedProps.id,
          }
          if(assetType=="splat"){
              prop.src = combinedProps.url;
          }      
          // console.log();
          // Create a new component with merged props
          const combinedComponent = React.cloneElement(gameObject, prop);
          return <PivotControls visible={objectId===index} onDrag={(e)=>{handleDrag(e)}}
          key={index}>{combinedComponent}</PivotControls>;
        });

  return (
    <>
        <Canvas>
            <CameraControls enabled ={isCtrlPressed}/>
            <Ground />
              {combinedComponents}
              {/* https://huggingface.co/cakewalk/splat-data/resolve/main/nike.splat */}
        </Canvas>
    </>
  )
}

export default Editor
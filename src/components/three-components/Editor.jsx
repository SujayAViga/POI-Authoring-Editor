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
          // Create a new component with merged props
          const combinedComponent = React.cloneElement(gameObject, prop);
      
          return <PivotControls key={index}>{combinedComponent}</PivotControls>;
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
import React, { useContext, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, PivotControls, Splat } from '@react-three/drei'
import Ground from './Ground';
import './Editor.css'
import { useGameObjects } from './GameObjectsProvider';
import { SelectedObjectContext } from './SelectedObjectProvider';
import { useProperties } from './PropertiesProvider';
import Cesium from '../poi-assets/Cesium';

function Editor() {    

    const { gameObjects, setGameObjects } = useGameObjects();
    const {properties,setProperties,testString,setTestString} = useProperties()
    const {objectId} = useContext(SelectedObjectContext)

    const [isAltPressed, setIsAltPressed] = useState(false);
    const handleKeyDown = (event) => {
        if (event.key === 'Alt') {
          setIsAltPressed(true);
        }
      };
  
      const handleKeyUp = (event) => {
        console.log(event.key);
        if (event.key === 'Alt') {
          setIsAltPressed(false);
        }
      };

      const handleDrag = (e) =>{          
          const updatedProperties = [...properties];
          // console.log(e.elements);
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
          else if(assetType=="cesium"){
            prop.ionAssetId = combinedProps.assetID
            prop.ionAccessToken = combinedProps.accessToken
          }
          // Create a new component with merged props
          const combinedComponent = React.cloneElement(gameObject, prop);
          return <PivotControls disableRotations={objectId!==index} disableSliders={objectId!==index} disableAxes={objectId!==index} onDrag={(e)=>{handleDrag(e)}}
          key={index}>{combinedComponent}</PivotControls>;
        });

  return (
    <>
        <Canvas>
            <CameraControls makeDefault/>
            <ambientLight intensity={Math.PI / 2} />
            <Ground />
              {combinedComponents}
              {/* <Splat src='https://huggingface.co/datasets/sujayA7299/Splat-data/resolve/main/empty.splat'/> */}
              {/* https://huggingface.co/cakewalk/splat-data/resolve/main/nike.splat */}
              {/* <PivotControls scale={50}>
                <Cesium position={[0,0,0]}/>
              </PivotControls> */}
        </Canvas>
    </>
  )
}

export default Editor
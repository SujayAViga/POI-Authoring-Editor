import React, { useContext, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Gltf, PivotControls, Splat, TransformControls } from '@react-three/drei'
import Ground from './Ground';
import './Editor.css'
import { useGameObjects } from './GameObjectsProvider';
import { SelectedObjectContext } from './SelectedObjectProvider';
import { useProperties } from './PropertiesProvider';
import Cesium from '../poi-assets/Cesium';
import { Physics, RigidBody } from '@react-three/rapier';
import { radToDeg } from 'three/src/math/MathUtils';

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
        // console.log(event.key);
        if (event.key === 'Alt') {
          setIsAltPressed(false);
        }
      };

      const handleDrag = (e) =>{          
          const updatedProperties = [...properties];
          updatedProperties[objectId].location.x = e.elements[12]
          updatedProperties[objectId].location.y = e.elements[13]
          updatedProperties[objectId].location.z = e.elements[14]

          // Extracting the rotation values from the transformation matrix
          const thetaX = radToDeg(Math.atan2(e.elements[9], e.elements[10]));
          const thetaY = radToDeg(Math.atan2(-e.elements[8], Math.sqrt(e.elements[9] ** 2 + e.elements[10] ** 2)));
          const thetaZ = radToDeg(Math.atan2(e.elements[4], e.elements[0]));

          // Assigning the rotation values to the state
          updatedProperties[objectId].rotation.x = thetaX;
          updatedProperties[objectId].rotation.y = thetaY;
          updatedProperties[objectId].rotation.z = thetaZ;

          // Call setProperties to update the state with the modified array
          setProperties(updatedProperties);

      }
  
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      // Set properties dynamically
        const combinedComponents = gameObjects.map((gameObject, index) => {
          // Merge props from properties array
          const combinedProps = properties[index]
          let assetType = combinedProps.type;
          let prop = {
            key: combinedProps.id,
          }
          if(assetType==="splat"){
              prop.src = combinedProps.url;
          }
          else if(assetType==="cesium"){
            prop.ionAssetId = combinedProps.assetID
            prop.ionAccessToken = combinedProps.accessToken
          }
          else if(assetType==="glb"){
            prop.src = combinedProps.url;
            
          }
          // Create a new component with merged props
          const combinedComponent = React.cloneElement(gameObject, prop);
          if(assetType==="glb"){
            return (
            <PivotControls
            fixed={false}
            disableRotations={objectId!==index}
            disableSliders={objectId!==index}
            disableAxes={objectId!==index}
            onDrag={(e)=>{handleDrag(e)}}
            key={index}>
              <RigidBody gravityScale={0} colliders={'hull'}>
                {combinedComponent}
              </RigidBody>
            </PivotControls>)
        }else{
          return (
            <PivotControls
            scale={2}
            fixed={false}
             disableRotations={objectId!==index}
             disableSliders={objectId!==index}
             disableAxes={objectId!==index}
             onDrag={(e)=>{handleDrag(e)}}
             key={index}>
              {combinedComponent}
          </PivotControls>)
        }
        });

  return (
    <>
        <Canvas camera={{ position: [15, 5, 20], fov: 50 }} dpr={[1, 2]}>
            <CameraControls makeDefault/>
            <ambientLight intensity={Math.PI / 2} />
            <Ground />
            <Physics debug>
              {combinedComponents}
            </Physics>
              {/* <Splat src='https://huggingface.co/datasets/sujayA7299/Splat-data/resolve/main/empty.splat'/> */}
              {/* https://huggingface.co/cakewalk/splat-data/resolve/main/train.splat */}
        </Canvas>
    </>
  )
}

export default Editor
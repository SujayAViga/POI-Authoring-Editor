import React, { useContext, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, Gltf, Splat, TransformControls } from '@react-three/drei'
import { PivotControls } from '../../assets/pivotControls';
import Ground from './Ground';
import './Editor.css'
import { useGameObjects } from './GameObjectsProvider';
import { SelectedObjectContext } from './SelectedObjectProvider';
import { useProperties } from './PropertiesProvider';
import Cesium from '../poi-assets/Cesium';
import { Physics, RigidBody } from '@react-three/rapier';
import { radToDeg } from 'three/src/math/MathUtils';
import Portal from '../poi-assets/Portal';

function Editor() {    

    const { gameObjects, setGameObjects } = useGameObjects();
    const {properties,setProperties,testString,setTestString} = useProperties()
    const {objectId, setAutoSave} = useContext(SelectedObjectContext)

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

          // Extracting the scaling values from the transformation matrix
          const scaleX = Math.sqrt(e.elements[0] ** 2 + e.elements[4] ** 2 + e.elements[8] ** 2);
          const scaleY = Math.sqrt(e.elements[1] ** 2 + e.elements[5] ** 2 + e.elements[9] ** 2);
          const scaleZ = Math.sqrt(e.elements[2] ** 2 + e.elements[6] ** 2 + e.elements[10] ** 2);

          updatedProperties[objectId].scale.x = scaleX;
          updatedProperties[objectId].scale.y = scaleY;
          updatedProperties[objectId].scale.z = scaleZ;

          // Call setProperties to update the state with the modified transforms
          setProperties(updatedProperties);

      }
  
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

        // Set properties dynamically and create a component with custom properties to be rendered in the 3d scene
        const combinedComponents = gameObjects.map((gameObject, index) => {
          // Assign properties to the component and return a new combined component 

          // make a copy of properties for the object at index
          const combinedProps = properties[index]

          // assign new values to the copied variable
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
            if(combinedProps.url===''){
              prop.src = 'https://huggingface.co/datasets/sujayA7299/Splat-data/resolve/main/building.glb'
            }else{
              prop.src = combinedProps.url;
            }
          }else if(assetType==="portal"){
            prop.exit = [10,10,10]
            prop.position = [0,0,0]
            prop.rotation = [0,0,0]
            prop.args = [1,1,1]
          }
          // Create a new component with merged props
          const combinedComponent = React.cloneElement(gameObject, prop);
            return (
              <PivotControls
                  depthTest={false}
                  disableRotations={objectId!==index}
                  disableSliders={objectId!==index}
                  disableAxes={objectId!==index}
                  onDrag={(e)=>{handleDrag(e)}}
                  onDragEnd={setAutoSave(true)}
                  scale={100}
                  fixed
                  lineWidth={4}
                  key={index}>
                {combinedComponent}
            </PivotControls>)
            
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
import React, { useContext, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, GizmoHelper, GizmoViewcube, GizmoViewport, Gltf, Splat, TransformControls } from '@react-three/drei'
import { PivotControls } from '../../assets/pivotControls';
import Ground from './Ground';
import './Editor.css'
import { useGameObjects } from './GameObjectsProvider';
import { SelectedObjectContext } from './SelectedObjectProvider';
import { useProperties } from './PropertiesProvider';
import Cesium from '../poi-assets/Cesium';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { radToDeg } from 'three/src/math/MathUtils';
import Portal from '../poi-assets/Portal';
import { Quaternion, Vector3 } from 'three';
import Label3d from './Label3d';
import InfoPanel from './InfoPanel';
import BoxCollider from '../poi-assets/BoxCollider';

function Editor() {    

    const { gameObjects, setGameObjects } = useGameObjects();
    const {properties,setProperties,testString,setTestString} = useProperties()
    const {objectId, setAutoSave,autoSaveData} = useContext(SelectedObjectContext)
    
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

          const loc = new Vector3().setFromMatrixPosition(e)
          const rot = new Quaternion().setFromRotationMatrix(e)
          const sc = new Vector3().setFromMatrixScale(e)
          

          updatedProperties[objectId].location.x = loc.x
          updatedProperties[objectId].location.y = loc.y
          updatedProperties[objectId].location.z = loc.z
          
          // Assigning the rotation values to the state
          updatedProperties[objectId].rotation.x = rot.x;
          updatedProperties[objectId].rotation.y = rot.y;
          updatedProperties[objectId].rotation.z = rot.z;
          updatedProperties[objectId].rotation.w = rot.w;

          updatedProperties[objectId].scale.x = sc.x;
          updatedProperties[objectId].scale.y = sc.y;
          updatedProperties[objectId].scale.z = sc.z;

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
          else if(assetType==="text"){
            prop.titleText = combinedProps.title
            prop.aboutText =  combinedProps.about
          }
          else if(assetType==="cesium"){
            prop.ionAssetId = combinedProps.assetID
            prop.ionAccessToken = combinedProps.accessToken
          }
          else if(assetType==="glb"){
            if(combinedProps.url===''){
              prop.src = 'https://huggingface.co/datasets/sujayA7299/Splat-data/resolve/main/empty.glb'
            }else{
              prop.src = combinedProps.url;
            }
          }else if(assetType==="portal"){
            prop.exit = [10,10,10]
            prop.position = [0,0,0]
            prop.rotation = [0,0,0]
            prop.args = [1,1,1]
          }else if(assetType==="image"){ //actually collider
            prop.position = [0,0,0]
            prop.rotation = [0,0,0]
            prop.scale = [0,0,0]
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
                  onDragEnd={autoSaveData}
                  // autoTransform
                  scale={100}
                  fixed
                  lineWidth={4}
                  key={index}>
                {combinedComponent}
            </PivotControls>)
            
        });

  return (
    <>
        <Canvas camera={{ position: [15,15,15], fov: 50 }} dpr={[1, 2]}>
            <CameraControls makeDefault/>
            <ambientLight intensity={Math.PI / 2} />
            <Ground />
            
            <GizmoHelper alignment="top-right" margin={[80, 80]} >
                <GizmoViewport axisColors={['#eb4d4b', '#6ab04c', '#2e86de']} labelColor="black" />
            </GizmoHelper>

            <Physics debug>
              {combinedComponents}            
            </Physics>
          

        </Canvas>
    </>
  )
}

export default Editor
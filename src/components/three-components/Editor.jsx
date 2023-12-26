import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, OrbitControls, PivotControls, Splat, TransformControls } from '@react-three/drei'
import Ground from './Ground';
import './Editor.css'
import { useGameObjects } from './GameObjectsProvider';

function Editor() {
    
    const { gameObjects, setGameObjects } = useGameObjects();
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
  return (
    <>
        <Canvas>
            <CameraControls enabled ={isCtrlPressed}/>
            <Ground />

              {gameObjects.map((object, index) => (
                <PivotControls key={index}>{object}</PivotControls>
              ))}
              {/* https://huggingface.co/cakewalk/splat-data/resolve/main/garden.splat */}
        </Canvas>
    </>
  )
}

export default Editor
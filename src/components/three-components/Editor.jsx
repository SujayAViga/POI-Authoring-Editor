import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, OrbitControls, PivotControls, TransformControls } from '@react-three/drei'
import Ground from './Ground';
import './Editor.css'

function Editor() {
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
            <PivotControls>
                <mesh>
                    <boxGeometry args={[1,1,1]}/>
                </mesh>
            </PivotControls>
            <Ground/>
        </Canvas>
    </>
  )
}

export default Editor
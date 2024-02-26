import { Box } from '@react-three/drei'
import React from 'react'

function BoxCollider() {
  return (
    <>
        <Box position={[0, 0, 0]} scale={[1, 1, 1]}>
          <meshPhongMaterial color="#ffff00" wireframe/>
        </Box>        
    </>
  )
}

export default BoxCollider
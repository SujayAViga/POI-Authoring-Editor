import { Text3D } from '@react-three/drei'
import React from 'react'


function Label3d({labelText,fontPath}) {
    
  
  return (
    <Text3D letterSpacing={-0.06} size={0.5} font={fontPath}>
        {labelText}
        <meshMatcapMaterial color="white" />
    </Text3D>
    
  )
}

export default Label3d
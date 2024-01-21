import { CuboidCollider } from '@react-three/rapier'
import React from 'react'

function Portal({setPlayerPosition,exit,position,playerPosition,name,setSplatVisible,args,rotation}) {
  
  const handleIntersection = (e)=>{
    const collidedObject = e.rigidBodyObject.name
    const portalName = e.target.colliderObject.name

    if(collidedObject=="Player"){
      setPlayerPosition([...exit])
      if(portalName=="entry"){
        setSplatVisible(true)
      }else{
        setSplatVisible(false)
      }
    }
    
  }

  return (
    <>
        <CuboidCollider
            name={name}
            position={position}
            rotation={rotation}
            args={args}
            sensor
            onIntersectionEnter={handleIntersection}
        />
    </>
  )
}

export default Portal
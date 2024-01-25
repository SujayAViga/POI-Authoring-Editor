import { CuboidCollider, RigidBody } from '@react-three/rapier'
import React, { useContext, useEffect, useState } from 'react'
import { useProperties } from '../three-components/PropertiesProvider'
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider';
import { Box } from '@react-three/drei';

function Portal({rotation,args,exit}) {
  const { objectId,authToken,api,mapId,createNewPoiData,poiData,setPoiData,mapData,updatePoiData,fetchPoiData,fetchDataFromAssets,addDataToAsset,updateAssetData} = useContext(SelectedObjectContext);

  const {properties,setProperties} = useProperties()
  

  return (
    <>
        <Box position={[0, 0, 0]} scale={[1, 1, 1]}>
          <meshPhongMaterial color="#00ff00" wireframe/>
        </Box>        
    </>
  )
}

export default Portal
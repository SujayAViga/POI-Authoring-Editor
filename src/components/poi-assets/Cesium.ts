import * as React from 'react'
import { useEffect, useRef } from 'react'
import * as ReactDOM from 'react-dom'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { CesiumIonTilesRenderer, TilesRenderer } from '3d-tiles-renderer'
import { OrbitControls } from '@react-three/drei'
import {Sphere,Vector3,Quaternion} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';

const Cesium = (props:any): null => {
  const { camera, gl, scene } = useThree()
  // camera.far = 100
  const tilesRendererRef = useRef<TilesRenderer>()

  function rotationBetweenDirections( dir1, dir2 ) {

    const rotation = new Quaternion();
    const a = new Vector3().crossVectors( dir1, dir2 );
    rotation.x = a.x;
    rotation.y = a.y;
    rotation.z = a.z;
    rotation.w = 1 + dir1.clone().dot( dir2 );
    rotation.normalize();    
    return rotation;
  
  }
  useEffect(() => {
    if(props.ionAssetId){
      const tilesRenderer = new CesiumIonTilesRenderer(props.ionAssetId,props.ionAccessToken);
      // const tilesRenderer = new TilesRenderer('https://raw.githubusercontent.com/NASA-AMMOS/3DTilesSampleData/master/msl-dingo-gap/0528_0260184_to_s64o256_colorize/0528_0260184_to_s64o256_colorize/0528_0260184_to_s64o256_colorize_tileset.json')
      tilesRenderer.setCamera(camera);
      tilesRenderer.setResolutionFromRenderer(camera, gl);
      tilesRenderer.fetchOptions.mode = 'cors';
      tilesRenderer.lruCache.minSize = 100;
      tilesRenderer.lruCache.maxSize = 1300;
      tilesRenderer.errorTarget = 0;
      
      tilesRenderer.onLoadTileSet = ()=>{
        const sphere = new Sphere()    
        tilesRenderer.getBoundingSphere(sphere)
        const position = sphere.center.clone();
        const distanceToEllipsoidCenter = position.length();
  
        const surfaceDirection = position.normalize();
        const up = new Vector3(0, 1, 0);
        const rotationToNorthPole = rotationBetweenDirections(surfaceDirection, up);
  
        tilesRenderer.group.quaternion.x = rotationToNorthPole.x;
        tilesRenderer.group.quaternion.y = rotationToNorthPole.y;
        tilesRenderer.group.quaternion.z = rotationToNorthPole.z;
        tilesRenderer.group.quaternion.w = rotationToNorthPole.w;
  
        tilesRenderer.group.position.x = 0;
        tilesRenderer.group.position.y = -distanceToEllipsoidCenter + 0;
        tilesRenderer.group.position.z = 0;
      }
          const dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderPath('https://unpkg.com/three@0.153.0/examples/jsm/libs/draco/gltf/');
  
          const loader = new GLTFLoader(tilesRenderer.manager);
          loader.setDRACOLoader(dracoLoader);
  
          tilesRenderer.manager.addHandler(/\.gltf$/, loader);
  
      
      scene.add(tilesRenderer.group);
      
  
      tilesRendererRef.current = tilesRenderer;
  
      return () => {
        
        scene.remove(tilesRenderer.group);
      };
    }
  },[props.ionAssetId])

  useFrame(() => {
    if(props.ionAssetId){      
      if (!tilesRendererRef.current) return
      const tilesRenderer = tilesRendererRef.current as TilesRenderer;
      camera.updateMatrixWorld();
      tilesRenderer.update();
    }
    
  })

  return null
}


export default Cesium
import React from 'react'
import './Inspector.css'

import Transforms from './Transforms'
import SplatProp from './poi-properties/SplatProp'
import VideosProp from './poi-properties/VideosProp'
import CesiumProp from './poi-properties/CesiumProp'
import TextProp from './poi-properties/TextProp'
import StaticGlbProp from './poi-properties/StaticGlbProp'
import PointCloudProp from './poi-properties/PointCloudProp'
import AnimatedGltfProp from './poi-properties/AnimatedGltfProp'
import AudioProp from './poi-properties/AudioProp'
import ImageProp from './poi-properties/ImageProp'
import { Route, Routes } from 'react-router-dom';


function Inspector({setSplatUrl}) {
  return (
    <div className='inpector-container'>
        <Routes>
          <Route path="/AnimatedGLB" element={<AnimatedGltfProp />} />
          <Route path="/Audio" element={<AudioProp />} />
          <Route path="/Cesium" element={<CesiumProp />} />
          <Route path="/Image" element={<ImageProp />} />
          <Route path="/Splat" element={<SplatProp setSplatUrl={setSplatUrl}/>} />
          <Route path="/Video" element={<VideosProp />} />
          <Route path="/Text" element={<TextProp />} />
          <Route path="/GLB" element={<StaticGlbProp />} />
          <Route path="/VV" element={<PointCloudProp />} />
        </Routes>
    </div>
  )
}

export default Inspector
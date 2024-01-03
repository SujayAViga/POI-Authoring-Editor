import React, { useContext } from 'react'
import Position from './Position'
import Rotation from './Rotation'
import Scale from './Scale'
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider'

function Transforms({transforms}) {
  const {objectId} = useContext(SelectedObjectContext)
  const handlePositionChange = ()=>{
    console.log("change position");
  }
  const handleRotationChange = () =>{
    console.log("rotation change");
  }
  const handleScaleChange = () =>{
    console.log("Scale change");
  }
  return (
    <div className='property-container'>
        Transforms
        <div>
          Position 
          <div>
              <input value={transforms.location.x} placeholder='x' style={{width:'25%',textAlign:'center', marginLeft:'2%'}} onChange={handlePositionChange}/>
              <input value={transforms.location.y} placeholder='y' style={{width:'25%',textAlign:'center', marginLeft:'2%'}} onChange={handlePositionChange}/>
              <input value={transforms.location.z} placeholder='z' style={{width:'25%',textAlign:'center', marginLeft:'2%'}} onChange={handlePositionChange}/>
          </div>
        </div>
        <div>
        Rotation 
        <div>
            <input value={transforms.rotation.x} placeholder='x' style={{width:'25%',textAlign:'center', marginLeft:'2%'}} onChange={handleRotationChange}/>
            <input value={transforms.rotation.y} placeholder='y' style={{width:'25%',textAlign:'center', marginLeft:'2%'}} onChange={handleRotationChange}/>
            <input value={transforms.rotation.z} placeholder='z' style={{width:'25%',textAlign:'center', marginLeft:'2%'}} onChange={handleRotationChange}/>
        </div>
    </div>
    <div>
        Scale 
        <div>
            <input value={transforms.scale.x} placeholder='x' style={{width:'25%',textAlign:'center', marginLeft:'2%'}} onChange={handleScaleChange}/>
            <input value={transforms.scale.y} placeholder='y' style={{width:'25%',textAlign:'center', marginLeft:'2%'}} onChange={handleScaleChange}/>
            <input value={transforms.scale.z} placeholder='z' style={{width:'25%',textAlign:'center', marginLeft:'2%'}} onChange={handleScaleChange}/>
        </div>
    </div>
    </div>
  )
}

export default Transforms
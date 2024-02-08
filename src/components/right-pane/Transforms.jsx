import React, { useContext, useEffect } from 'react'
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider'
import { useProperties } from '../three-components/PropertiesProvider'
import './Transforms.css'

function Transforms({transforms}) {
  const {objectId} = useContext(SelectedObjectContext)
  const {properties,testString} = useProperties()
  
  const handlePositionChange = (e)=>{
    // console.log(e.target.value);
    // properties[objectId].location.x = e.target.value;
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
              <input value={(transforms.location.x).toFixed(2)} placeholder='y' style={{width:'30%',textAlign:'center', marginLeft:'2%'}} onChange={(e)=>{handlePositionChange}}/>
              <input value={(transforms.location.y).toFixed(2)} placeholder='x' style={{width:'30%',textAlign:'center', marginLeft:'2%'}} onChange={(e)=>{handlePositionChange}}/>
              <input value={(transforms.location.z).toFixed(2)} placeholder='z' style={{width:'30%',textAlign:'center', marginLeft:'2%'}} onChange={(e)=>{handlePositionChange}}/>
          </div>
        </div>
        <div>
        Rotation 
        <div>
            <input value={(transforms.rotation.x).toFixed(2)} placeholder='x' style={{width:'30%',textAlign:'center', marginLeft:'2%'}} onChange={handleRotationChange}/>
            <input value={(transforms.rotation.y).toFixed(2)} placeholder='y' style={{width:'30%',textAlign:'center', marginLeft:'2%'}} onChange={handleRotationChange}/>
            <input value={(transforms.rotation.z).toFixed(2)} placeholder='z' style={{width:'30%',textAlign:'center', marginLeft:'2%'}} onChange={handleRotationChange}/>
        </div>
    </div>
    <div>
        Scale 
        <div>
            <input value={(transforms.scale.x).toFixed(2)} placeholder='x' style={{width:'30%',textAlign:'center', marginLeft:'2%'}} onChange={handleScaleChange}/>
            <input value={(transforms.scale.y).toFixed(2)} placeholder='y' style={{width:'30%',textAlign:'center', marginLeft:'2%'}} onChange={handleScaleChange}/>
            <input value={(transforms.scale.z).toFixed(2)} placeholder='z' style={{width:'30%',textAlign:'center', marginLeft:'2%'}} onChange={handleScaleChange}/>
        </div>
    </div>
    </div>
  )
}

export default Transforms
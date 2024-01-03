import React, { useContext, useEffect, useState } from 'react'
import './Inspector.css'
import SplatProp from './poi-properties/SplatProp'
import VideosProp from './poi-properties/VideosProp'
import CesiumProp from './poi-properties/CesiumProp'
import TextProp from './poi-properties/TextProp'
import StaticGlbProp from './poi-properties/StaticGlbProp'
import PointCloudProp from './poi-properties/PointCloudProp'
import AnimatedGltfProp from './poi-properties/AnimatedGltfProp'
import AudioProp from './poi-properties/AudioProp'
import ImageProp from './poi-properties/ImageProp'
import { SelectedObjectContext } from '../three-components/SelectedObjectProvider'
import axios from 'axios'



function Inspector () {
  const [type, setType] = useState()
  const [Name, setName] = useState()
  const [lang, setLang] = useState()

  const { selectedObject, authToken,setAuthToken,api } = useContext(SelectedObjectContext);
  


  const handleLogin = async () => {
    try {
      // Check if authToken is already set
      if (!authToken) {
        const response = await api.post(
          'user/login/',
          {
            email: "sujay.amberkar@vigaet.com",
            password: 'sujay1234',
          }
        );

        setAuthToken(response.data.accessToken);
        // Handle the response here
        console.log('Login successful');
      }
    } catch (error) {
      // Handle errors here
      console.error('Login failed:', error.message);
    }
  };
  

  useEffect(()=>{
    handleLogin();
    if(selectedObject){
      setName(selectedObject.poiName)
      setType(selectedObject.poiType)
      setLang(selectedObject.locale)
    }
   
  })
  
  if (!selectedObject) {
    return <div>Select a game object to view properties.</div>;
  }

  switch (type) {
    case '1':
      return (        
      <div className='inpector-container'>
        <div>{selectedObject.poiName}</div>
        <PointCloudProp key={Name} objectId={Name} />
      </div>)
    
    case '2':
      return (        
      <div className='inpector-container'>
        <CesiumProp key={Name} objectId={Name} />
      </div>)
    
    case '3':
      return (        
      <div className='inpector-container'>
        <StaticGlbProp key={Name} objectId={Name} />
      </div>)
    
    case '4':
      return (        
      <div className='inpector-container'>
        <AnimatedGltfProp key={Name} objectId={Name} />
      </div>)

    case '5':
      return (        
      <div className='inpector-container'>
        <ImageProp key={Name} objectId={Name} />
      </div>)

    case '6':
      return (        
      <div className='inpector-container'>
        <VideosProp key={Name} objectId={Name} />
      </div>)

    case '7':
      return (        
      <div className='inpector-container'>
        <TextProp key={Name} objectId={Name} />
      </div>)

    case '8':
      return (        
      <div className='inpector-container'>
        <AudioProp key={Name} objectId={Name} />
      </div>)

    case '9':
      return (        
      <div className='inpector-container'>
        <div className='property-container'>{selectedObject.poiName}</div>
        <SplatProp key={Name} objectId={Name} />
      </div>)
      
      default:
        return (
          <div className='property-container'>select</div>)
  }
};

export default Inspector;

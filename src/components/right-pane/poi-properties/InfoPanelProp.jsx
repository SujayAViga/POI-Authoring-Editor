import React, { useContext, useEffect, useState } from 'react'
import Transforms from '../Transforms'
import { Form } from 'react-bootstrap'
import { useProperties } from '../../three-components/PropertiesProvider';
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';

function InfoPanelProp() {
    const {autoSaveData,autoSave,
        objectId,authToken,api,mapId,
        createNewPoiData,poiData,setPoiData,
        mapData,updatePoiData,fetchPoiData,fetchDataFromAssets,
        addDataToAsset,updateAssetData} = useContext(SelectedObjectContext);
        
      const {properties,setProperties} = useProperties()
      const [localAbout, setLocalAbout] = useState('')
      const [localTitle, setLocalTitle] = useState('')
      const [assetData, setAssetData] = useState()
      const [updatedPoiData, setUpdatedPoiData] = useState(null)

      useEffect(()=>{
        setLocalAbout(properties[objectId].about)
        setLocalTitle(properties[objectId].title)
      },[])

      useEffect(()=>{    
        setUpdatedPoiData(
          {
            mapId: mapId,
            POIId: properties[objectId].poiId,
            type: "7",
            location: {
              x: properties[objectId].location.x,
              y: properties[objectId].location.y,
              z: properties[objectId].location.z
            },
            rotation: {
              x: properties[objectId].rotation.x,
              y: properties[objectId].rotation.y,
              z: properties[objectId].rotation.z,
              w: properties[objectId].rotation.w
            },
            scale: {
              x: properties[objectId].scale.x,
              y: properties[objectId].scale.y,
              z: properties[objectId].scale.z,
            },
          }
        )
        
          setAssetData({
            mapId: mapId,
            POIId: properties[objectId].poiId,
            text: localAbout,
            language: localTitle,
          })
      },[properties,localAbout,localTitle])

      useEffect(()=>{
        // create asset if not else update the existing asset
        if(assetData && properties[objectId].poiId && !properties[objectId].assetCreated){
          if(authToken){
            console.log(assetData);
            addDataToAsset(assetData)
          }
          
        }else if(assetData && properties[objectId].poiId && properties[objectId].assetCreated){
          if(updatedPoiData){
            updatePoiData(updatedPoiData).then(()=>{
              updateAssetData(assetData).then(()=>{
                fetchPoiData(mapId).then(()=>{
                  fetchDataFromAssets(mapId,properties[objectId].poiId)
                })
              })
            })
          }
        }
        
      },[autoSave])

      const handleUpdate = () =>{
        // store previous values of "properties" array
        const updatedProperties = [...properties];
        // update url 
        updatedProperties[objectId].title = localTitle;
        updatedProperties[objectId].about = localAbout;
        // set the updated properties as properties
        setProperties(updatedProperties);
        autoSaveData()
        console.log(updatedProperties[objectId].about);
      }
  
      const handleTitleChange = (e) => {
        setLocalTitle(e.target.value)
      };
      const handleAboutChange = (e) => {
        setLocalAbout(e.target.value)
      };

      const fontPaths = ['/RobotoSlab.json','/Inter_Bold.json','/ProtestRevolution.json']

    return (
    <>
      <Transforms transforms = {properties[objectId]}/>
      <div className='property-container'>
        <h4>Information Panel</h4>
          {/* <input  value={this.state.value} onChange={handleChange} /> */}
          <Form>
                Title
                <input onChange={handleTitleChange} value={localTitle} type="text" placeholder='Title' name="title" />
                About
                <textarea onChange={handleAboutChange} value={localAbout} placeholder='about' style={{width:"95%", height:"10em",padding:"1%", margin:'1%',fontSize:16}} />
          </Form>
          <button className="button" onClick={handleUpdate}>Update</button>
      </div>
    </>
  )
}

export default InfoPanelProp
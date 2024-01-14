import React, { useContext, useEffect, useState } from 'react'
import Transforms from '../Transforms'
import { useProperties } from '../../three-components/PropertiesProvider';
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import { Button } from 'react-bootstrap';

function StaticGlbProp() {
  const { objectId,authToken,api} = useContext(SelectedObjectContext);
  const {properties,setProperties} = useProperties()
  const [localUrl, setLocalUrl] = useState('')
  const [assetData, setAssetData] = useState()

  // https://huggingface.co/datasets/sujayA7299/Splat-data/resolve/main/collider.glb

  useEffect(()=>{
    setLocalUrl(properties[objectId].url)
    setAssetData({
      mapId: "46djYs1XYstXTKT4JAlh",
      POIId: "IVgWggHCA4xxMu6H6dTR",
      language: "english",
      URL: properties[objectId].url,
      text: "this is an example text",
      exitPortalPosition: {
        x: properties[objectId].location.x,
        y: properties[objectId].location.y,
        z: properties[objectId].location.z
      },
      exitPortalRotation: {
        x: properties[objectId].rotation.x,
        y: properties[objectId].rotation.y,
        z: properties[objectId].rotation.z,
        w: 0.4
      },
      exitPortalScale: {
        x: 1.5,
        y: 1.5,
        z: 1.5
      },
      exitPortalText: "string",
      splatBoundaryCenter: {
        x: 0,
        y: 0,
        z: 0
      },
      splatBoundaryRadius: 0,
      splatBoundaryWidth: 0,
      splatBoundaryHeight: 0,
      splatBoundaryLength: 0
    })
    console.log(assetData);
  },[properties])
  
  const handleUrlChange = (e) =>{
    setLocalUrl(e.target.value)
  }
  
  const handleUpdate = (e) =>{
    // store previous values of "properties" array
    const updatedProperties = [...properties];
    // update url 
    updatedProperties[objectId].url = localUrl;
    // set the updated properties as properties
    setProperties(updatedProperties);
    console.log(assetData.URL);
    if(authToken){
      updateAssetData().then(()=>{
        fetchDataFromAssets()
      })
    }
  }

  
  const fetchDataFromAssets = async () =>{
    try {
      const response = await api.post(
        'asset/get/',
        {
          mapId: "46djYs1XYstXTKT4JAlh",
          POIId: "IVgWggHCA4xxMu6H6dTR"
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log("Assets fetched",response.data);
      setAssetData(response.data)
    } catch (error) {
      console.error('Failed to fetch from /assets/get', error.message);
    }
  };
  
  

  const addDataToAsset = async () => {
    try {
      const response = await api.post(
        'asset/',
        assetData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Asset created!! ", response.status);
    } catch (error) {
      console.error('Failed to post data to /asset/', error.message);
    }
  };

  const updateAssetData =  async () => {
    try {
      const response = await api.patch(
        `asset/`, // Update the url with the specific POI ID
        assetData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Updated asset data successfully", response.status);
    } catch (error) {
      console.error('Failed to update data to /asset/', error.message);
    }
  };
  
  
  return (
    <>
      <Transforms transforms={properties[objectId]}/>
      <div className='property-container'>
        <h4>Static Glb Prop</h4>
        
        <input value={localUrl} placeholder='Glb Url' onChange={handleUrlChange}/>
        <Button onClick={handleUpdate}>Update</Button>
      </div>
    </>
  )
}

export default StaticGlbProp
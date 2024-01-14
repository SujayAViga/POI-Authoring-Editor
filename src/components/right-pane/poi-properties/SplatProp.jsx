import React, { useContext, useEffect, useState } from 'react'
import Transforms from '../Transforms'
import { Button } from 'react-bootstrap'
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import { useProperties } from '../../three-components/PropertiesProvider';

function SplatProp() {
  const { objectId,authToken,api} = useContext(SelectedObjectContext);
  const [splatLocalUrl, setSplatLocalUrl] = useState('');
  const {properties,setProperties} = useProperties()
  const [assetData, setAssetData] = useState()


  useEffect(()=>{
    setSplatLocalUrl(properties[objectId].url)
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
  },[properties])

  const handleSplatFetch = () =>{

  }
  
  const handleSplatUpdate = () =>{
    // store previous values of "properties" array
    const updatedProperties = [...properties];
    // update url 
    updatedProperties[objectId].url = splatLocalUrl;
    // set the updated properties as properties
    setProperties(updatedProperties);
    
    console.log(assetData.URL);
    if(authToken){
      updateAssetData().then(()=>{
        fetchDataFromAssets()
      })
    }
  }
  const handleUrlChange = (e) => {
    setSplatLocalUrl(e.target.value)
  };

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
      <Transforms transforms = {properties[objectId]}/>
      <div className='property-container'>
        <h4>Splat Property</h4>
        <input placeholder="Locale"/>
        <input placeholder='Splat url' value={splatLocalUrl} onChange={handleUrlChange}/>
        <input placeholder='Exit portal'/>
        <input placeholder='Entry portal'/>
        {/* <Button onClick={handleSplatFetch}>Fetch</Button> */}
        <Button onClick={handleSplatUpdate}>Update</Button>
      </div>
    </>
  )
}

export default SplatProp



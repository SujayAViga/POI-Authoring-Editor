import React, { useContext, useEffect, useState } from 'react'
import Transforms from '../Transforms'
import { Button } from 'react-bootstrap'
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';
import axios from 'axios';
import { useProperties } from '../../three-components/PropertiesProvider';

function SplatProp({url}) {
  const { api,authToken,objectId} = useContext(SelectedObjectContext);
  const [splatLocalUrl, setSplatLocalUrl] = useState('');
  const {properties,setProperties} = useProperties()

  const [lang, setLang] = useState()

  useEffect(()=>{
    setSplatLocalUrl(properties[objectId].url)
    // console.log("splatProp",objectId,properties);
  },[properties])

  const handleSplatFetch = () =>{
    fetchDataFromPoi()
    // setSplatLocalUrl(splatLocalUrl)
  }
  const handleSplatUpdate = () =>{
    // updatePoiData()
    // fetchDataFromPoi()
    const updatedProperties = [...properties];
      
      // Update the 5th element (index 4) with a new value
      updatedProperties[objectId].url = splatLocalUrl;
      console.log("e",updatedProperties[objectId]);

      // Call setProperties to update the state with the modified array
      setProperties(updatedProperties);

  }

  const updatedPoiData = {
    mapId: "46djYs1XYstXTKT4JAlh",
    POIId: "IVgWggHCA4xxMu6H6dTR",
    type: 9, 
    location: {
      x: 0,
      y: 22.4194,
      z: -15.94
    },
    rotation: {
      x: 377.7749,
      y: -122.4194,
      z: 66,
      w: 35.56
    },
    scale: {
      x: 37.7749,
      y: -122.4194,
      z: 66
    },
    tags: [
      "123",
      "tag1",
      "tag2"
    ]
  }

  const [res, setRes] = useState()
  const fetchDataFromPoi = async () => {
    try {
      const response = await api.post(
        'poi/get/',
        {
          mapId: "46djYs1XYstXTKT4JAlh",
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Data from /poi/",response.data);
      setRes(response.data.message[0].location.x )
      console.log("res",res);
    } catch (error) {
      console.error('Failed to fetch from /poi/get', error.message);
    }
  };
  const handleUrlChange = (e) => {
    setSplatLocalUrl(e.target.value)
  };
  

  const updatePoiData =  async () => {
    try {
      const response = await api.patch(
        `poi/`, // Update the url with the specific POI ID
        updatedPoiData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Updated poi data successfully", response.status);
    } catch (error) {
      console.error('Failed to update data to /poi/', error.message);
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
        <Button onClick={handleSplatFetch}>Fetch</Button>
        <Button onClick={handleSplatUpdate}>Update</Button>
      </div>
    </>
  )
}

export default SplatProp



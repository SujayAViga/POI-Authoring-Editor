import axios from 'axios';
import { createContext, useRef, useState } from 'react';
import { useProperties } from './PropertiesProvider';

const SelectedObjectContext = createContext();

const SelectedObjectProvider = ({ children }) => {
  const {properties,setProperties} = useProperties()

  const [selectedObject, setSelectedObject] = useState(null);
  const [objectId, setObjectId] = useState(0)
  const [locale, setLocale] = useState()
  const [authToken, setAuthToken] = useState()
  const [mapId, setMapId] = useState('yeTvXpZYgMIfyirMQxSr') // setpreviouspoiId in mapjsx
  const [poiData,setPoiData ] = useState([])
  const [previousPoiIDs, setPreviousPoiIDs] = useState([])
  const firstRender = useRef(true);

  const [mapData, setMapData] = useState()

  const [autoSave, setAutoSave] = useState(0)
  const [colliderList, setColliderList] = useState([])

  const autoSaveData = () =>{
    setAutoSave(autoSave+1)
    console.log(autoSave);
  }

  // -------------Map API -------------//
  const fetchDataFromMap = async () => {
    try {
      const response = await api.get('map/', {
        headers: {
          Authorization: `Bearer ${authToken}`, 
        },
      });
      // Handle the response here
      console.log('Global Data from /map/:', response.data);
      setMapData(response.data);
      
    } catch (error) {
      // Handle errors here
      console.error('Failed to fetch data from /map/:', error.message);
    }
  };
  

  const deleteMapData = async (mapId) => {
    try {
      const response = await api.delete(`map/${mapId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log(`Deleted map with ID ${mapId}`, response.status);
    } catch (error) {
      console.error(`Failed to delete map with ID ${mapId}`, error.message);
    }
  };
//-----------------------Map API------------------//

// -----------------------Poi API------------------//

  const createNewPoiData = async (updatedPoiData) => {
    try {
      const response = await api.post(
        'poi/',
        updatedPoiData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json', // Add this line
          },
        }
      );
      console.log("posted ", objectId);
      console.log("Posted poi data successfully", response.status);
    } catch (error) {
      console.error('Failed to post data to /poi/', error.message);
    }
  };

  const fetchPoiData = async (mapId) =>{
    try {
      const response = await api.post(
        'poi/get/',
        {
          mapId: mapId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // console.log("poi fetched",response.data);
      // setPoiData(response.data.message)
      
      // Sort the data based on the 'createdOn' timestamp in ascending order
        const sortedPoiData = response.data.message.sort((a, b) =>
        new Date(a.createdOn) - new Date(b.createdOn)
      );

      console.log("poi fetched", sortedPoiData);
      setPoiData(sortedPoiData);
    } catch (error) {
      console.error('Failed to fetch from /poi/get', error.message);
    }
  };

  const updatePoiData =  async (updatedPoiData) => {
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
      console.log("Updated Poi data successfully", response.status);
    } catch (error) {
      console.error('Failed to update data to /poi/', error.message);
    }
  };
 

  const deletePoiData = async (mapId, poiId) => {
    try {
      const response = await api.delete(`poi/`, {
        data: {
          mapId: mapId,
          POIId: poiId,
        },
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log(`Deleted Poi with ID ${poiId}`, response.status);
      
    } catch (error) {
      console.error(`Failed to delete poi with ID ${poiId}`, error.message);
    }
  };

// -----------------------------POI API ---------------------//

// ---------------------------Asset API----------------------//
const addDataToAsset = async (assetData) => {
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
    if(response.status===200){
      properties[objectId].assetCreated = true
    }
  } catch (error) {
    console.error('Failed to post data to /asset/', error.message);
  }
};


  
const updateAssetData =  async (assetData) => {
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

const fetchDataFromAssets = async (mapId, poiId) =>{
  try {
    const response = await api.post(
      'asset/get/',
      {
        mapId: mapId,
        POIId: poiId,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    // console.log("Assets fetched",response.data);
    console.log(response.data)
  } catch (error) {
    console.error('Failed to fetch from /assets/get', error.message);
  }
};


// -----------------------Asset API -------------------//

  const api = axios.create({
    baseURL: "https://us-central1-poi-application.cloudfunctions.net/webApp/"
  })

  const contextValue = {
    autoSaveData,
    poiData,setPoiData,
    fetchDataFromMap,deletePoiData,createNewPoiData,fetchPoiData,updatePoiData,addDataToAsset,updateAssetData,fetchDataFromAssets,
    mapId,setMapId,
    api,
    authToken,setAuthToken,
    locale,setLocale,
    objectId,setObjectId,
    selectedObject,setSelectedObject,
    colliderList, setColliderList,
    mapData,setMapData,
    firstRender,
    previousPoiIDs, setPreviousPoiIDs,autoSave, setAutoSave,
  };

  return <SelectedObjectContext.Provider value={contextValue}>{children}</SelectedObjectContext.Provider>;
};

export { SelectedObjectProvider, SelectedObjectContext };
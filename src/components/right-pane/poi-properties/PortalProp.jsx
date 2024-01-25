import React, { useContext } from 'react'
import Transforms from '../Transforms'
import { useProperties } from '../../three-components/PropertiesProvider'
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';

function PortalProp() {
  const { objectId,authToken,api,mapId,createNewPoiData,poiData,setPoiData,mapData,updatePoiData,fetchPoiData,fetchDataFromAssets,addDataToAsset,updateAssetData} = useContext(SelectedObjectContext);

  const {properties,setProperties} = useProperties()

  return (
    <>
    <Transforms transforms={properties[objectId]}/>  
    <div className='property-container'>
      <h4>Portal Prop</h4>
      <h4>Exit Position</h4>
      <input style={{width:'30%',textAlign:'center', marginLeft:'2%'}} placeholder=' X'/>
      <input style={{width:'30%',textAlign:'center', marginLeft:'2%'}} placeholder='Y'/>
      <input style={{width:'30%',textAlign:'center', marginLeft:'2%'}} placeholder='Z'/>
    </div>
  </>
  )
}

export default PortalProp
import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import Transforms from '../Transforms'
import { useProperties } from '../../three-components/PropertiesProvider';
import { SelectedObjectContext } from '../../three-components/SelectedObjectProvider';



function TextProp() {
    const {autoSaveData,autoSave,
      objectId,authToken,api,mapId,
      createNewPoiData,poiData,setPoiData,
      mapData,updatePoiData,fetchPoiData,fetchDataFromAssets,
      addDataToAsset,updateAssetData} = useContext(SelectedObjectContext);
      
    const {properties,setProperties} = useProperties()
    const [localText, setLocalText] = useState('')

    const handleUpdate = () =>{
      // store previous values of "properties" array
      const updatedProperties = [...properties];
      // update url 
      updatedProperties[objectId].text = localText;
      // set the updated properties as properties
      setProperties(updatedProperties);
      autoSaveData()
      console.log(updatedProperties[objectId].labelText);
    }

    const handleChange = (e) => {
      setLocalText(e.target.value)
    };

    const fontPaths = ['/RobotoSlab.json','/Inter_Bold.json','/ProtestRevolution.json']

  return (
    <>
      <Transforms transforms = {properties[objectId]}/>
      <div className='property-container'>
        <h4>Text Prop</h4>
          {/* <textarea value={this.state.value} onChange={handleChange} /> */}
          <textarea onChange={handleChange} placeholder='Text' style={{width:"95%", height:"10em",padding:"1%", margin:'1%',fontSize:16}} />
          <Form.Select style={{ width: "95%", height: "2em", padding: "1%", margin: '1%', fontSize: 16, fontFamily: '' }}>
            <option>Font</option>
            {['Roboto', 'Inter', 'Protest'].map((font,index) => (
              <option key={font} value={fontPaths[index]}>{font}</option>
            ))}
          </Form.Select>

          <Form.Select style={{ width: "95%", height: "2em", padding: "1%", margin: '1%', fontSize: 16 }}>
            <option>Font size</option>
            {[12, 14, 16, 18, 20].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </Form.Select>
          <button className="button" onClick={handleUpdate}>Update</button>
      </div>
    </>
  )
}

export default TextProp
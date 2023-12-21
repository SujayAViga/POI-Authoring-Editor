import React from 'react'
import { Form } from 'react-bootstrap'
import Transforms from '../Transforms'

function TextProp() {
  return (
    <>
      <Transforms/>
      <div className='property-container'>
        <h4>Text Prop</h4>
          {/* <textarea value={this.state.value} onChange={this.handleChange} /> */}
          <textarea placeholder='Text' style={{width:"95%", height:"10em",padding:"1%", margin:'1%',fontSize:16}} />
          <Form.Select style={{ width: "95%", height: "2em", padding: "1%", margin: '1%', fontSize: 16, fontFamily: '' }}>
            <option>Font</option>
            {['Ariel', 'Cursive', 'Serif'].map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </Form.Select>

          <Form.Select style={{ width: "95%", height: "2em", padding: "1%", margin: '1%', fontSize: 16, fontFamily: '' }}>
            <option>Font size</option>
            {[12, 14, 16, 18, 20].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </Form.Select>
      </div>
    </>
  )
}

export default TextProp
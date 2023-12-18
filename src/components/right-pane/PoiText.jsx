import React from 'react'

function PoiText() {
  return (
    <div style={{textAlign:'center'}}>
        {/* <textarea value={this.state.value} onChange={this.handleChange} /> */}
        <textarea placeholder='Text' style={{width:"95%", height:"15em",padding:"1%", margin:'1%',fontSize:16}} />
    </div>
  )
}

export default PoiText
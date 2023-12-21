import React,{useState} from 'react'
import Transforms from '../Transforms';

function AudioProp() {
    const [sliderValue, setSliderValue] = useState(50); // Initial value

    const handleSliderChange = (event) => {
      setSliderValue(event.target.value);
    };
  return (
    <>
      <Transforms/>
      <div className='property-container'>
          <h4>Audio Prop</h4>
          <input placeholder='Url'/>
          <input
          type="range"
          id="slider"
          name="slider"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleSliderChange}
        />
        <p>Volume: {sliderValue}</p>
      </div>
    </>
  )
}

export default AudioProp
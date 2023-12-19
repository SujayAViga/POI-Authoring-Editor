import React,{useState} from 'react'

function AudioProp() {
    const [sliderValue, setSliderValue] = useState(50); // Initial value

    const handleSliderChange = (event) => {
      setSliderValue(event.target.value);
    };
  return (
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
  )
}

export default AudioProp
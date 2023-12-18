// CreatePoi.js
import React, { useState } from 'react';
import './CreatePoi.css';
import Form from 'react-bootstrap/Form';
import FormSelect from 'react-bootstrap/FormSelect'

function CreateMap({onClose,setMapName}) {
    const handleAddPoi = () => {
        onClose(); // Close the modal
    };

    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <span className="close-button" onClick={onClose}>
            &times;
            </span>
            <h2 style={{color:'black'}}>Create Map</h2>
            <input placeholder='Map Name' onChange={(e)=>{setMapName(e.target.value)}}/>
            <button onClick={handleAddPoi} type='submit'>Create</button>
        </div>
        </div>
    );
}

export default CreateMap;

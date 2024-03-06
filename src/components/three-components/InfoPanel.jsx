import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import './InfoPanel.css'

function InfoPanel({titleText,aboutText}) {

    const [isVisible, setIsVisible] = useState(1)
    const [showPanel, setShowPanel] = useState(0)

    const handlePanel = ()=>{
        setShowPanel(!showPanel)
        // setIsVisible(!isVisible)
    }

    return (
        <>
            <Html zIndexRange={[0,-1]} position={[0,0,0]} style={{ transition: 'opacity 2s', opacity: isVisible ? 1 : 0.2, transform: `scale(${isVisible ? 2 : 3})` }} >
            <FaMapMarkerAlt onClick={handlePanel} style={{ color: 'indianred' }} /> 
                {showPanel?
                    <>
                        <div  className='panel-container'>
                            <div className='title-text'>
                                {titleText}
                            </div>
                            <div className='about-text'>
                                {aboutText}
                            </div>
                        </div>
                    </>                    
                    :null
                }
            </Html>
        </>
    )
}

export default InfoPanel
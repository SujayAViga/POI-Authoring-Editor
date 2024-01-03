// Create a context
import React, { createContext, useContext, useState } from 'react';

const PropertiesContext = createContext()

export const PropertiesProvider = ({children})=>{
    const [properties, setProperties] = useState([])
    const [testString, setTestString] = useState('testString')
    const value = {properties, setProperties,testString, setTestString};

    return(
        <PropertiesContext.Provider value = {value}>
            {children}
        </PropertiesContext.Provider>
    )
}

export const useProperties = () => {
    return useContext(PropertiesContext);
  };
  
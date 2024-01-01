// Create a context
import React, { createContext, useContext, useState } from 'react';

const DynamicGameObjectContext = createContext();

export const DynamicGameObjectProvider = ({ children }) => {
  const [dynamicGameObject, setDynamicGameObject] = useState([]);
  const value = { dynamicGameObject, setDynamicGameObject }; // Corrected the setter name

  return (
    <DynamicGameObjectContext.Provider value={value}>
      {children}
    </DynamicGameObjectContext.Provider>
  );
};

export const useDynamicGameObject = () => {
  return useContext(DynamicGameObjectContext);
};

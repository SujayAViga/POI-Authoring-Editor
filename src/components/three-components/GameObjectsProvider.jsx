// Create a context
import React, { createContext, useContext, useState } from 'react';

const GameObjectsContext = createContext();

export const GameObjectsProvider = ({ children }) => {
    const [gameObjects, setGameObjects] = useState([]);
    const value = { gameObjects, setGameObjects };

    return (
      <GameObjectsContext.Provider value={value}>
        {children}
      </GameObjectsContext.Provider>
    );
};

export const useGameObjects = () => {
    return useContext(GameObjectsContext);
};

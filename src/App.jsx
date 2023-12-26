import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { GameObjectsProvider } from './components/three-components/GameObjectsProvider';
import { PropertiesProvider } from './components/three-components/PropertiesProvider';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<GameObjectsProvider>
                                      <PropertiesProvider>
                                          <Home />
                                      </PropertiesProvider>
                                    </GameObjectsProvider>} />

          <Route path="/login/" element={<Login />} />
          <Route path="/signup/" element={<Signup />} />
        </Routes>
      </BrowserRouter>     
    </>
  )
}

export default App

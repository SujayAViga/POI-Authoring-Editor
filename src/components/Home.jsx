import React, { useContext, useState } from 'react'
import Hierarchy from './left-pane/Hierarchy'
import Editor from './three-components/Editor'
import Inspector from './right-pane/Inspector'
import './Home.css'
import { SelectedObjectProvider } from './three-components/SelectedObjectProvider'

function Home() {
  const [splatUrl, setSplatUrl] = useState('')
 
  
  return (
    <SelectedObjectProvider>
      <div className='home-container'>
          {/* Hierarchy */}
          <Hierarchy  className='Hierarchy'/>
          {/* Editor */}
          <Editor splatUrl={splatUrl} className='Editor'/>
          {/* Inspector */}
          <Inspector setSplatUrl={setSplatUrl} className='Inspector'/>
      </div>
    </SelectedObjectProvider>
  )
}

export default Home
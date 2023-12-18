import React from 'react'
import Hierarchy from './left-pane/Hierarchy'
import Editor from './three-components/Editor'
import Inspector from './right-pane/Inspector'
import './Home.css'

function Home() {
  return (
    <div className='home-container'>
        {/* Hierarchy */}
        <Hierarchy className='Hierarchy'/>
        {/* Editor */}
        <Editor className='Editor'/>
        {/* Inspector */}
        <Inspector className='Inspector'/>
    </div>
  )
}

export default Home
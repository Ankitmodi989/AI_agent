import React from 'react'
import { Minimize2, Square, X, Menu } from 'lucide-react'
import './TitleBar.css'

const TitleBar = () => {
  const handleMinimize = () => {
    // In a real Electron app, this would minimize the window
    console.log('Minimize window')
  }

  const handleMaximize = () => {
    // In a real Electron app, this would maximize/restore the window
    console.log('Maximize/restore window')
  }

  const handleClose = () => {
    // In a real Electron app, this would close the window
    console.log('Close window')
  }

  return (
    <div className="title-bar">
      <div className="title-bar-left">
        <button className="menu-button" title="Application menu">
          <Menu size={16} />
        </button>
        <span className="title">Cursor Clone</span>
      </div>
      
      <div className="title-bar-center">
        <span className="subtitle">AI-Powered Code Editor</span>
      </div>
      
      <div className="title-bar-right">
        <button 
          className="title-bar-button minimize"
          onClick={handleMinimize}
          title="Minimize"
        >
          <Minimize2 size={14} />
        </button>
        
        <button 
          className="title-bar-button maximize"
          onClick={handleMaximize}
          title="Maximize"
        >
          <Square size={14} />
        </button>
        
        <button 
          className="title-bar-button close"
          onClick={handleClose}
          title="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}

export default TitleBar

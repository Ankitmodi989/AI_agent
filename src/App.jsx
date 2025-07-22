import React, { useState, useEffect } from 'react'
import { FileSystemProvider } from './contexts/FileSystemContext'
import { EditorProvider } from './contexts/EditorContext'
import { AIProvider } from './contexts/AIContext'
import TitleBar from './components/TitleBar'
import Sidebar from './components/Sidebar'
import EditorArea from './components/EditorArea'
import StatusBar from './components/StatusBar'
import AIChat from './components/AIChat'
import './App.css'

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(250)
  const [showAIChat, setShowAIChat] = useState(false)
  const [aiChatWidth, setAIChatWidth] = useState(400)
  const [isResizing, setIsResizing] = useState(false)

  const handleSidebarResize = (e) => {
    if (isResizing) {
      const newWidth = Math.max(200, Math.min(400, e.clientX))
      setSidebarWidth(newWidth)
    }
  }

  const handleAIChatResize = (e) => {
    if (isResizing) {
      const newWidth = Math.max(300, Math.min(600, window.innerWidth - e.clientX))
      setAIChatWidth(newWidth)
    }
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      handleSidebarResize(e)
      handleAIChatResize(e)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  return (
    <FileSystemProvider>
      <EditorProvider>
        <AIProvider>
          <div className="app">
            <TitleBar />
            <div className="app-body">
              <div 
                className="sidebar" 
                style={{ width: sidebarWidth }}
              >
                <Sidebar />
              </div>
              
              <div 
                className="sidebar-resizer"
                onMouseDown={() => setIsResizing(true)}
              />
              
              <div className="editor-container">
                <EditorArea />
              </div>
              
              {showAIChat && (
                <>
                  <div 
                    className="ai-chat-resizer"
                    onMouseDown={() => setIsResizing(true)}
                  />
                  
                  <div 
                    className="ai-chat" 
                    style={{ width: aiChatWidth }}
                  >
                    <AIChat onClose={() => setShowAIChat(false)} />
                  </div>
                </>
              )}
            </div>
            <StatusBar onToggleAIChat={() => setShowAIChat(!showAIChat)} />
          </div>
        </AIProvider>
      </EditorProvider>
    </FileSystemProvider>
  )
}

export default App

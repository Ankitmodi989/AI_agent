import React from 'react'
import { 
  GitBranch, 
  AlertCircle, 
  CheckCircle, 
  Zap, 
  Wifi, 
  WifiOff,
  MessageSquare,
  Settings
} from 'lucide-react'
import { useFileSystem } from '../contexts/FileSystemContext'
import { useEditor } from '../contexts/EditorContext'
import { useAI } from '../contexts/AIContext'
import './StatusBar.css'

const StatusBar = ({ onToggleAIChat }) => {
  const { getActiveFile, files } = useFileSystem()
  const { theme, fontSize } = useEditor()
  const { isConnected } = useAI()
  
  const activeFile = getActiveFile()

  const getLineAndColumn = () => {
    // In a real implementation, this would get the cursor position from Monaco
    return { line: 1, column: 1 }
  }

  const { line, column } = getLineAndColumn()

  const getFileStats = () => {
    if (!activeFile) return null
    
    const lines = activeFile.content.split('\n').length
    const characters = activeFile.content.length
    const words = activeFile.content.split(/\s+/).filter(word => word.length > 0).length
    
    return { lines, characters, words }
  }

  const stats = getFileStats()

  return (
    <div className="status-bar">
      <div className="status-left">
        {/* Git Branch */}
        <div className="status-item">
          <GitBranch size={14} />
          <span>main</span>
        </div>

        {/* File Status */}
        <div className="status-item">
          <CheckCircle size={14} className="status-success" />
          <span>No issues</span>
        </div>

        {/* AI Connection Status */}
        <div className="status-item">
          {isConnected ? (
            <>
              <Wifi size={14} className="status-success" />
              <span>AI Connected</span>
            </>
          ) : (
            <>
              <WifiOff size={14} className="status-error" />
              <span>AI Disconnected</span>
            </>
          )}
        </div>
      </div>

      <div className="status-center">
        {/* File Information */}
        {activeFile && stats && (
          <div className="file-info">
            <span className="file-stats">
              Ln {line}, Col {column} • {stats.lines} lines • {stats.words} words • {stats.characters} chars
            </span>
          </div>
        )}
      </div>

      <div className="status-right">
        {/* File Language */}
        {activeFile && (
          <div className="status-item clickable">
            <span>{activeFile.language}</span>
          </div>
        )}

        {/* Encoding */}
        <div className="status-item clickable">
          <span>UTF-8</span>
        </div>

        {/* Line Ending */}
        <div className="status-item clickable">
          <span>LF</span>
        </div>

        {/* Theme */}
        <div className="status-item clickable">
          <span>{theme === 'vs-dark' ? 'Dark' : 'Light'}</span>
        </div>

        {/* Font Size */}
        <div className="status-item clickable">
          <span>{fontSize}px</span>
        </div>

        {/* AI Chat Toggle */}
        <div className="status-item clickable" onClick={onToggleAIChat}>
          <MessageSquare size={14} />
          <span>AI Chat</span>
        </div>

        {/* Settings */}
        <div className="status-item clickable">
          <Settings size={14} />
        </div>
      </div>
    </div>
  )
}

export default StatusBar

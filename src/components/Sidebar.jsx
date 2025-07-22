import React, { useState } from 'react'
import { 
  Files, 
  Search, 
  GitBranch, 
  Package, 
  Settings, 
  Plus,
  File,
  FolderOpen,
  X,
  MoreHorizontal
} from 'lucide-react'
import { useFileSystem } from '../contexts/FileSystemContext'
import './Sidebar.css'

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('files')
  const [showNewFileInput, setShowNewFileInput] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  
  const { 
    files, 
    openFiles, 
    activeFileId, 
    createFile, 
    deleteFile, 
    openFile,
    closeFile 
  } = useFileSystem()

  const handleCreateFile = (e) => {
    e.preventDefault()
    if (newFileName.trim()) {
      const extension = newFileName.split('.').pop()
      const languageMap = {
        'js': 'javascript',
        'jsx': 'javascript',
        'ts': 'typescript',
        'tsx': 'typescript',
        'py': 'python',
        'html': 'html',
        'css': 'css',
        'json': 'json',
        'md': 'markdown',
        'txt': 'plaintext'
      }
      
      const language = languageMap[extension] || 'plaintext'
      const newFile = createFile(newFileName, '', language)
      openFile(newFile.id)
      setNewFileName('')
      setShowNewFileInput(false)
    }
  }

  const handleDeleteFile = (e, fileId) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this file?')) {
      deleteFile(fileId)
    }
  }

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    // Return appropriate icon based on file extension
    return <File size={16} />
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'files':
        return (
          <div className="files-panel">
            <div className="panel-header">
              <h3>Explorer</h3>
              <button
                className="icon-button"
                onClick={() => setShowNewFileInput(true)}
                title="New File"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="file-list">
              {showNewFileInput && (
                <form onSubmit={handleCreateFile} className="new-file-form">
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="filename.ext"
                    className="new-file-input"
                    autoFocus
                    onBlur={() => {
                      if (!newFileName.trim()) {
                        setShowNewFileInput(false)
                      }
                    }}
                  />
                </form>
              )}
              
              {files.map(file => (
                <div
                  key={file.id}
                  className={`file-item ${activeFileId === file.id ? 'active' : ''}`}
                  onClick={() => openFile(file.id)}
                >
                  <div className="file-info">
                    {getFileIcon(file.name)}
                    <span className="file-name">{file.name}</span>
                  </div>
                  <button
                    className="file-action"
                    onClick={(e) => handleDeleteFile(e, file.id)}
                    title="Delete file"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
        
      case 'search':
        return (
          <div className="search-panel">
            <div className="panel-header">
              <h3>Search</h3>
            </div>
            <div className="search-content">
              <input
                type="text"
                placeholder="Search files..."
                className="search-input"
              />
              <input
                type="text"
                placeholder="Replace..."
                className="search-input"
              />
              <div className="search-options">
                <label>
                  <input type="checkbox" /> Match Case
                </label>
                <label>
                  <input type="checkbox" /> Whole Word
                </label>
                <label>
                  <input type="checkbox" /> Use Regex
                </label>
              </div>
            </div>
          </div>
        )
        
      case 'git':
        return (
          <div className="git-panel">
            <div className="panel-header">
              <h3>Source Control</h3>
            </div>
            <div className="git-content">
              <p className="git-status">No changes</p>
              <div className="git-actions">
                <button className="git-button">Commit</button>
                <button className="git-button">Push</button>
                <button className="git-button">Pull</button>
              </div>
            </div>
          </div>
        )
        
      case 'extensions':
        return (
          <div className="extensions-panel">
            <div className="panel-header">
              <h3>Extensions</h3>
            </div>
            <div className="extensions-content">
              <p>No extensions installed</p>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-tabs">
        <button
          className={`sidebar-tab ${activeTab === 'files' ? 'active' : ''}`}
          onClick={() => setActiveTab('files')}
          title="Explorer"
        >
          <Files size={20} />
        </button>
        
        <button
          className={`sidebar-tab ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
          title="Search"
        >
          <Search size={20} />
        </button>
        
        <button
          className={`sidebar-tab ${activeTab === 'git' ? 'active' : ''}`}
          onClick={() => setActiveTab('git')}
          title="Source Control"
        >
          <GitBranch size={20} />
        </button>
        
        <button
          className={`sidebar-tab ${activeTab === 'extensions' ? 'active' : ''}`}
          onClick={() => setActiveTab('extensions')}
          title="Extensions"
        >
          <Package size={20} />
        </button>
        
        <div className="sidebar-tabs-bottom">
          <button
            className="sidebar-tab"
            title="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
      
      <div className="sidebar-content">
        {renderTabContent()}
      </div>
    </div>
  )
}

export default Sidebar

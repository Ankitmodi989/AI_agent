import React, { useState, useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { X, Plus, MoreHorizontal } from 'lucide-react'
import { useFileSystem } from '../contexts/FileSystemContext'
import { useEditor } from '../contexts/EditorContext'
import './EditorArea.css'

const EditorArea = () => {
  const { 
    files, 
    openFiles, 
    activeFileId, 
    openFile, 
    closeFile, 
    updateFile, 
    getFile,
    getActiveFile 
  } = useFileSystem()
  
  const { editorOptions } = useEditor()
  const [editorInstance, setEditorInstance] = useState(null)
  const editorRef = useRef(null)

  const activeFile = getActiveFile()

  const handleEditorDidMount = (editor, monaco) => {
    setEditorInstance(editor)
    editorRef.current = editor

    // Configure Monaco Editor
    monaco.editor.defineTheme('cursor-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'regexp', foreground: 'D16969' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'class', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'variable', foreground: '9CDCFE' },
        { token: 'constant', foreground: '4FC1FF' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#cccccc',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#cccccc',
        'editor.selectionBackground': '#264f78',
        'editor.selectionHighlightBackground': '#3a3d41',
        'editorCursor.foreground': '#cccccc',
        'editor.findMatchBackground': '#515c6a',
        'editor.findMatchHighlightBackground': '#ea5c004d',
        'editor.linkedEditingBackground': '#f00',
        'editorBracketMatch.background': '#0064001a',
        'editorBracketMatch.border': '#888888'
      }
    })

    monaco.editor.setTheme('cursor-dark')

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Save file (mock)
      console.log('Save file')
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyW, () => {
      if (activeFileId) {
        closeFile(activeFileId)
      }
    })

    // Auto-save on content change
    editor.onDidChangeModelContent(() => {
      if (activeFile) {
        const content = editor.getValue()
        updateFile(activeFile.id, { content })
      }
    })
  }

  const handleTabClose = (e, fileId) => {
    e.stopPropagation()
    closeFile(fileId)
  }

  const getFileLanguageIcon = (language) => {
    const icons = {
      javascript: '🟨',
      typescript: '🔷',
      python: '🐍',
      html: '🌐',
      css: '🎨',
      json: '📋',
      markdown: '📝',
      plaintext: '📄'
    }
    return icons[language] || '📄'
  }

  const renderTabs = () => {
    if (openFiles.length === 0) {
      return (
        <div className="no-tabs">
          <span>No files open</span>
        </div>
      )
    }

    return (
      <div className="editor-tabs">
        <div className="tabs-container">
          {openFiles.map(fileId => {
            const file = getFile(fileId)
            if (!file) return null
            
            return (
              <div
                key={fileId}
                className={`editor-tab ${activeFileId === fileId ? 'active' : ''}`}
                onClick={() => openFile(fileId)}
              >
                <span className="tab-icon">
                  {getFileLanguageIcon(file.language)}
                </span>
                <span className="tab-name">{file.name}</span>
                <button
                  className="tab-close"
                  onClick={(e) => handleTabClose(e, fileId)}
                  title="Close"
                >
                  <X size={12} />
                </button>
              </div>
            )
          })}
        </div>
        
        <div className="tabs-actions">
          <button className="tab-action" title="More actions">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    )
  }

  const renderEditor = () => {
    if (!activeFile) {
      return (
        <div className="no-editor">
          <div className="welcome-content">
            <h2>Welcome to Cursor Clone</h2>
            <p>Start by opening a file from the explorer or create a new one.</p>
            <div className="welcome-actions">
              <button 
                className="welcome-button"
                onClick={() => {
                  // Focus on the file explorer
                  const newFileBtn = document.querySelector('.icon-button')
                  if (newFileBtn) newFileBtn.click()
                }}
              >
                Create New File
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <Editor
        height="100%"
        language={activeFile.language}
        value={activeFile.content}
        options={editorOptions}
        onMount={handleEditorDidMount}
        theme="cursor-dark"
        loading={<div className="editor-loading">Loading editor...</div>}
      />
    )
  }

  return (
    <div className="editor-area">
      {renderTabs()}
      <div className="editor-content">
        {renderEditor()}
      </div>
    </div>
  )
}

export default EditorArea

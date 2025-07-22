import React, { createContext, useContext, useState, useCallback } from 'react'

const FileSystemContext = createContext()

export const useFileSystem = () => {
  const context = useContext(FileSystemContext)
  if (!context) {
    throw new Error('useFileSystem must be used within a FileSystemProvider')
  }
  return context
}

export const FileSystemProvider = ({ children }) => {
  const [files, setFiles] = useState([
    {
      id: '1',
      name: 'Welcome.md',
      type: 'file',
      content: `# Welcome to Cursor Clone!

This is a modern code editor inspired by Cursor, built with React and Monaco Editor.

## Features

- 📁 File Explorer
- 🎨 Syntax Highlighting
- 🤖 AI Chat Integration
- 🔍 Search & Replace
- ⌨️ Keyboard Shortcuts
- 🎯 Multiple Cursors
- 📱 Responsive Design

## Getting Started

1. Create new files using the + button in the file explorer
2. Open the AI chat using Ctrl+Shift+L (or Cmd+Shift+L on Mac)
3. Use Ctrl+P (or Cmd+P on Mac) to quickly open files
4. Press F1 to open the command palette

Enjoy coding! 🚀
`,
      language: 'markdown',
      path: '/Welcome.md'
    },
    {
      id: '2',
      name: 'example.js',
      type: 'file',
      content: `// Welcome to Cursor Clone!
// This is a sample JavaScript file

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

console.log('Fibonacci of 10:', fibonacci(10));
console.log('Doubled numbers:', doubled);

// Try using the AI chat to ask questions about this code!
export { fibonacci };
`,
      language: 'javascript',
      path: '/example.js'
    }
  ])

  const [openFiles, setOpenFiles] = useState([])
  const [activeFileId, setActiveFileId] = useState(null)

  const createFile = useCallback((name, content = '', language = 'plaintext') => {
    const newFile = {
      id: Date.now().toString(),
      name,
      type: 'file',
      content,
      language,
      path: `/${name}`
    }
    setFiles(prev => [...prev, newFile])
    return newFile
  }, [])

  const updateFile = useCallback((id, updates) => {
    setFiles(prev => prev.map(file => 
      file.id === id ? { ...file, ...updates } : file
    ))
  }, [])

  const deleteFile = useCallback((id) => {
    setFiles(prev => prev.filter(file => file.id !== id))
    setOpenFiles(prev => prev.filter(fileId => fileId !== id))
    if (activeFileId === id) {
      setActiveFileId(null)
    }
  }, [activeFileId])

  const openFile = useCallback((fileId) => {
    if (!openFiles.includes(fileId)) {
      setOpenFiles(prev => [...prev, fileId])
    }
    setActiveFileId(fileId)
  }, [openFiles])

  const closeFile = useCallback((fileId) => {
    setOpenFiles(prev => prev.filter(id => id !== fileId))
    if (activeFileId === fileId) {
      const remainingFiles = openFiles.filter(id => id !== fileId)
      setActiveFileId(remainingFiles.length > 0 ? remainingFiles[remainingFiles.length - 1] : null)
    }
  }, [activeFileId, openFiles])

  const getFile = useCallback((id) => {
    return files.find(file => file.id === id)
  }, [files])

  const getActiveFile = useCallback(() => {
    return activeFileId ? getFile(activeFileId) : null
  }, [activeFileId, getFile])

  const value = {
    files,
    openFiles,
    activeFileId,
    createFile,
    updateFile,
    deleteFile,
    openFile,
    closeFile,
    getFile,
    getActiveFile
  }

  return (
    <FileSystemContext.Provider value={value}>
      {children}
    </FileSystemContext.Provider>
  )
}

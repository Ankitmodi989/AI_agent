import React, { createContext, useContext, useState, useCallback } from 'react'

const EditorContext = createContext()

export const useEditor = () => {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  return context
}

export const EditorProvider = ({ children }) => {
  const [theme, setTheme] = useState('vs-dark')
  const [fontSize, setFontSize] = useState(14)
  const [wordWrap, setWordWrap] = useState('off')
  const [minimap, setMinimap] = useState({ enabled: true })
  const [lineNumbers, setLineNumbers] = useState('on')
  const [folding, setFolding] = useState(true)
  const [bracketMatching, setBracketMatching] = useState('always')
  const [autoClosingBrackets, setAutoClosingBrackets] = useState('always')
  const [autoClosingQuotes, setAutoClosingQuotes] = useState('always')
  const [formatOnSave, setFormatOnSave] = useState(true)
  const [tabSize, setTabSize] = useState(2)
  const [insertSpaces, setInsertSpaces] = useState(true)

  const editorOptions = {
    theme,
    fontSize,
    wordWrap,
    minimap,
    lineNumbers,
    folding,
    bracketMatching,
    autoClosingBrackets,
    autoClosingQuotes,
    formatOnSave,
    tabSize,
    insertSpaces,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace",
    fontLigatures: true,
    renderWhitespace: 'selection',
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: true,
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    automaticLayout: true,
    glyphMargin: true,
    useTabStops: false,
    hover: {
      enabled: true,
      delay: 100,
      sticky: true
    },
    suggest: {
      enabled: true,
      snippetsPreventQuickSuggestions: false
    },
    parameterHints: {
      enabled: true,
      cycle: false
    }
  }

  const updateSetting = useCallback((key, value) => {
    switch (key) {
      case 'theme':
        setTheme(value)
        break
      case 'fontSize':
        setFontSize(value)
        break
      case 'wordWrap':
        setWordWrap(value)
        break
      case 'minimap':
        setMinimap(value)
        break
      case 'lineNumbers':
        setLineNumbers(value)
        break
      case 'folding':
        setFolding(value)
        break
      case 'bracketMatching':
        setBracketMatching(value)
        break
      case 'autoClosingBrackets':
        setAutoClosingBrackets(value)
        break
      case 'autoClosingQuotes':
        setAutoClosingQuotes(value)
        break
      case 'formatOnSave':
        setFormatOnSave(value)
        break
      case 'tabSize':
        setTabSize(value)
        break
      case 'insertSpaces':
        setInsertSpaces(value)
        break
      default:
        console.warn(`Unknown editor setting: ${key}`)
    }
  }, [])

  const resetSettings = useCallback(() => {
    setTheme('vs-dark')
    setFontSize(14)
    setWordWrap('off')
    setMinimap({ enabled: true })
    setLineNumbers('on')
    setFolding(true)
    setBracketMatching('always')
    setAutoClosingBrackets('always')
    setAutoClosingQuotes('always')
    setFormatOnSave(true)
    setTabSize(2)
    setInsertSpaces(true)
  }, [])

  const value = {
    editorOptions,
    theme,
    fontSize,
    wordWrap,
    minimap,
    lineNumbers,
    folding,
    bracketMatching,
    autoClosingBrackets,
    autoClosingQuotes,
    formatOnSave,
    tabSize,
    insertSpaces,
    updateSetting,
    resetSettings
  }

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  )
}

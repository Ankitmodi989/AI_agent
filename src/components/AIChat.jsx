import React, { useState, useRef, useEffect } from 'react'
import { Send, X, Trash2, Copy, RotateCcw, Bot, User } from 'lucide-react'
import { useAI } from '../contexts/AIContext'
import { useFileSystem } from '../contexts/FileSystemContext'
import './AIChat.css'

const AIChat = ({ onClose }) => {
  const [inputValue, setInputValue] = useState('')
  const [includeContext, setIncludeContext] = useState(true)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  
  const { messages, isLoading, sendMessage, clearMessages, deleteMessage } = useAI()
  const { getActiveFile } = useFileSystem()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Focus input when chat opens
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const activeFile = getActiveFile()
    const context = includeContext && activeFile ? {
      fileName: activeFile.name,
      language: activeFile.language,
      content: activeFile.content
    } : null

    await sendMessage(inputValue, context)
    setInputValue('')
  }

  const handleCopyMessage = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        // Could show a toast notification here
        console.log('Message copied to clipboard')
      })
      .catch(err => {
        console.error('Failed to copy message:', err)
      })
  }

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    const lines = content.split('\n')
    const formatted = []
    let inCodeBlock = false
    let codeLanguage = ''

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          formatted.push('</code></pre>')
          inCodeBlock = false
        } else {
          codeLanguage = line.slice(3).trim()
          formatted.push(`<pre><code class="language-${codeLanguage}">`)
          inCodeBlock = true
        }
        continue
      }

      if (inCodeBlock) {
        formatted.push(line)
      } else {
        let formattedLine = line
        // Bold text
        formattedLine = formattedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Inline code
        formattedLine = formattedLine.replace(/`(.*?)`/g, '<code>$1</code>')
        // Links (basic)
        formattedLine = formattedLine.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        
        if (formattedLine.trim() === '') {
          formatted.push('<br>')
        } else {
          formatted.push(`<p>${formattedLine}</p>`)
        }
      }
    }

    if (inCodeBlock) {
      formatted.push('</code></pre>')
    }

    return formatted.join('')
  }

  const renderMessage = (message) => {
    const isUser = message.type === 'user'
    const isError = message.type === 'error'
    
    return (
      <div key={message.id} className={`message ${message.type}`}>
        <div className="message-header">
          <div className="message-avatar">
            {isUser ? <User size={16} /> : <Bot size={16} />}
          </div>
          <div className="message-info">
            <span className="message-sender">
              {isUser ? 'You' : isError ? 'Error' : 'AI Assistant'}
            </span>
            <span className="message-time">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div className="message-actions">
            <button
              className="message-action"
              onClick={() => handleCopyMessage(message.content)}
              title="Copy message"
            >
              <Copy size={14} />
            </button>
            <button
              className="message-action"
              onClick={() => deleteMessage(message.id)}
              title="Delete message"
            >
              <X size={14} />
            </button>
          </div>
        </div>
        
        <div className="message-content">
          {message.context && (
            <div className="message-context">
              <strong>Context:</strong> {message.context.fileName} ({message.context.language})
            </div>
          )}
          <div 
            className="message-text"
            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="ai-chat">
      <div className="ai-chat-header">
        <div className="chat-title">
          <Bot size={16} />
          <span>AI Assistant</span>
        </div>
        <div className="chat-actions">
          <button
            className="chat-action"
            onClick={clearMessages}
            title="Clear conversation"
          >
            <Trash2 size={16} />
          </button>
          <button
            className="chat-action"
            onClick={onClose}
            title="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="ai-chat-messages">
        {messages.map(renderMessage)}
        {isLoading && (
          <div className="message assistant loading">
            <div className="message-header">
              <div className="message-avatar">
                <Bot size={16} />
              </div>
              <div className="message-info">
                <span className="message-sender">AI Assistant</span>
                <span className="message-time">Thinking...</span>
              </div>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="ai-chat-input">
        <div className="input-options">
          <label className="context-option">
            <input
              type="checkbox"
              checked={includeContext}
              onChange={(e) => setIncludeContext(e.target.checked)}
            />
            <span>Include current file context</span>
          </label>
        </div>
        
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-container">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about your code..."
              className="chat-input"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <button
              type="submit"
              className="send-button"
              disabled={!inputValue.trim() || isLoading}
              title="Send message (Enter)"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AIChat

import React, { createContext, useContext, useState, useCallback } from 'react'

const AIContext = createContext()

export const useAI = () => {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAI must be used within an AIProvider')
  }
  return context
}

export const AIProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI coding assistant. I can help you with code questions, explanations, debugging, and more. How can I assist you today?',
      timestamp: Date.now()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(true) // Mock connection status

  const sendMessage = useCallback(async (content, context = null) => {
    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      context,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Simulate AI response with a delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      // Mock AI responses based on content
      let response = generateMockResponse(content, context)
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: Date.now()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const generateMockResponse = (content, context) => {
    const lowerContent = content.toLowerCase()
    
    if (lowerContent.includes('hello') || lowerContent.includes('hi')) {
      return "Hello! I'm here to help you with your coding tasks. Feel free to ask me about any code you're working on, or if you need help with debugging, explanations, or improvements."
    }
    
    if (lowerContent.includes('fibonacci')) {
      return `The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones. The implementation you have is a classic recursive approach:

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`

While this is elegant, it's not very efficient for large numbers due to repeated calculations. Here's a more efficient iterative version:

\`\`\`javascript
function fibonacciIterative(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
\`\`\`

This has O(n) time complexity instead of O(2^n).`
    }
    
    if (lowerContent.includes('javascript') || lowerContent.includes('js')) {
      return "JavaScript is a versatile programming language! I can help you with ES6+ features, async/await, promises, DOM manipulation, React, Node.js, and much more. What specific JavaScript topic would you like to explore?"
    }
    
    if (lowerContent.includes('react')) {
      return `React is a powerful library for building user interfaces! I can help you with:

- Components and JSX
- Hooks (useState, useEffect, useContext, etc.)
- State management
- Props and prop drilling
- Performance optimization
- Testing React components
- Best practices and patterns

What specific React concept would you like to learn about?`
    }
    
    if (lowerContent.includes('debug') || lowerContent.includes('error')) {
      return "I'd be happy to help you debug! Please share the code that's causing issues and describe what you expected vs. what's actually happening. Common debugging strategies include:\n\n1. Using console.log() to trace execution\n2. Checking the browser's developer tools\n3. Reading error messages carefully\n4. Breaking down complex problems into smaller parts\n\nWhat specific issue are you facing?"
    }
    
    if (lowerContent.includes('explain') && context) {
      return `Looking at your code, I can explain what's happening:

${context.content ? `\`\`\`${context.language || 'javascript'}\n${context.content}\n\`\`\`` : ''}

This code demonstrates several key concepts. Would you like me to explain any specific part in more detail?`
    }
    
    // Default response
    return `I understand you're asking about: "${content}"

I'm here to help with coding questions, explanations, debugging, code reviews, and suggestions for improvements. Could you provide more details about what you'd like to know or what specific help you need?

Some things I can help with:
- Explaining code concepts
- Debugging issues
- Code optimization
- Best practices
- Language-specific questions
- Architecture suggestions`
  }

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        type: 'assistant',
        content: 'Hello! I\'m your AI coding assistant. I can help you with code questions, explanations, debugging, and more. How can I assist you today?',
        timestamp: Date.now()
      }
    ])
  }, [])

  const deleteMessage = useCallback((messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId))
  }, [])

  const value = {
    messages,
    isLoading,
    isConnected,
    sendMessage,
    clearMessages,
    deleteMessage
  }

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  )
}

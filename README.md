# Cursor Clone

A modern, AI-powered code editor inspired by Cursor, built with React and Monaco Editor.

## Features

- 🎨 **Modern UI**: Clean, dark theme with professional styling
- 📁 **File Explorer**: Create, open, edit, and delete files
- 🤖 **AI Assistant**: Integrated AI chat for code help and explanations
- ⌨️ **Monaco Editor**: Full-featured code editor with syntax highlighting
- 🔍 **Search & Replace**: Find and replace text across files
- 🎯 **Multiple Tabs**: Work with multiple files simultaneously
- 📱 **Responsive**: Works on desktop and mobile devices
- ⚡ **Fast**: Built with Vite for lightning-fast development

## Technology Stack

- **React 18** - Modern React with hooks
- **Monaco Editor** - VS Code's editor engine
- **Vite** - Next-generation build tool
- **Lucide React** - Beautiful, customizable icons
- **CSS Variables** - Consistent theming system

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cursor-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

### File Management
- Use the **Explorer** panel to view and manage files
- Click the **+** button to create new files
- Click on any file to open it in the editor
- Use the **×** button to delete files (with confirmation)

### Code Editing
- Full syntax highlighting for multiple languages
- Auto-completion and IntelliSense
- Multiple cursor support
- Find and replace functionality
- Keyboard shortcuts (Ctrl/Cmd + S to save, etc.)

### AI Assistant
- Click the **AI Chat** button in the status bar to open the AI assistant
- Ask questions about your code
- Get explanations, debugging help, and suggestions
- Include current file context for more relevant responses

### Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save file
- `Ctrl/Cmd + W` - Close current tab
- `Ctrl/Cmd + P` - Quick open file (planned)
- `F1` - Command palette (planned)
- `Ctrl/Cmd + Shift + L` - Toggle AI chat (planned)

## Project Structure

```
src/
├── components/          # React components
│   ├── TitleBar.jsx    # Window title bar
│   ├── Sidebar.jsx     # File explorer and panels
│   ├── EditorArea.jsx  # Monaco editor and tabs
│   ├── AIChat.jsx      # AI assistant chat
│   └── StatusBar.jsx   # Bottom status bar
├── contexts/           # React contexts for state management
│   ├── FileSystemContext.jsx  # File management
│   ├── EditorContext.jsx      # Editor settings
│   └── AIContext.jsx          # AI chat functionality
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── services/           # External service integrations
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## Customization

### Themes
The editor uses CSS variables for easy theming. Modify the variables in `src/index.css` to customize colors:

```css
:root {
  --bg-primary: #1e1e1e;
  --bg-secondary: #252526;
  --text-primary: #cccccc;
  --accent-blue: #007acc;
  /* ... more variables */
}
```

### Editor Settings
Editor configuration can be modified in `src/contexts/EditorContext.jsx`:

```javascript
const editorOptions = {
  theme: 'vs-dark',
  fontSize: 14,
  wordWrap: 'off',
  minimap: { enabled: true },
  // ... more options
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Real AI integration (OpenAI, Anthropic, etc.)
- [ ] Git integration with visual diff
- [ ] Extension system
- [ ] Command palette
- [ ] Multi-cursor editing
- [ ] Code folding and minimap
- [ ] Terminal integration
- [ ] Project workspace support
- [ ] Settings panel
- [ ] Themes marketplace

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [Cursor](https://cursor.sh/) - The AI-first code editor
- Built with [Monaco Editor](https://microsoft.github.io/monaco-editor/) - VS Code's editor
- Icons by [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- Fonts by [JetBrains Mono](https://www.jetbrains.com/lp/mono/) - A typeface for developers

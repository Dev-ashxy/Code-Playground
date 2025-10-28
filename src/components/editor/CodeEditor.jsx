import { useStore } from '../../store/useStore'
import { useEffect, useRef } from 'react'

function CodeEditor() {
  const { files, activeFile, updateFile } = useStore()
  const currentFile = files[activeFile]
  const textareaRef = useRef(null)

  useEffect(() => {
    // Focus the textarea when component mounts or active file changes
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [activeFile])

  if (!currentFile) {
    return (
      <div style={{ 
        height: '100%', 
        background: '#1e1e1e', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        No file selected
      </div>
    )
  }

  const handleChange = (e) => {
    const newValue = e.target.value
    updateFile(activeFile, newValue)
  }

  const handleKeyDown = (e) => {
    // Handle Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newValue = currentFile.value.substring(0, start) + '  ' + currentFile.value.substring(end)
      updateFile(activeFile, newValue)
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <div style={{ 
      height: '100%', 
      background: '#1e1e1e', 
      display: 'flex', 
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* File name header */}
      <div style={{
        padding: '8px 16px',
        background: '#252526',
        color: '#ccc',
        fontSize: '12px',
        borderBottom: '1px solid #333',
        flexShrink: 0
      }}>
        Editing: <span style={{ color: '#4ec9b0' }}>{currentFile.name}</span>
      </div>

      {/* Editor textarea */}
      <textarea
        ref={textareaRef}
        value={currentFile.value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus
        style={{
          flex: 1,
          width: '100%',
          background: '#1e1e1e',
          color: '#d4d4d4',
          border: 'none',
          padding: '16px',
          fontSize: '14px',
          fontFamily: 'Consolas, Monaco, "Courier New", monospace',
          resize: 'none',
          outline: 'none',
          lineHeight: '1.6',
          tabSize: 2,
          whiteSpace: 'pre',
          overflowWrap: 'normal',
          overflowX: 'auto'
        }}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Start typing your code here..."
      />
    </div>
  )
}

export default CodeEditor
import { Save, FolderOpen, RotateCcw, Layout } from 'lucide-react'
import { useStore } from './store/useStore'
import EditorTabs from './components/editor/EditorTabs'
import ResizableLayout from './components/layout/ResizableLayout'
import { useEffect } from 'react'

function App() {
  const { toggleLayout, layout, resetFiles, files, activeFile } = useStore()

  // Debug: Log the files when component mounts
  useEffect(() => {
    console.log('App mounted')
    console.log('Current files:', files)
    console.log('Active file:', activeFile)
    console.log('Active file content:', files[activeFile])
  }, [])

  // Debug: Log whenever files change
  useEffect(() => {
    console.log('Files changed:', files)
  }, [files])

  const handleSave = () => {
    const dataStr = JSON.stringify(files, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'project.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleLoad = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (!file) return
      
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const loadedFiles = JSON.parse(event.target.result)
          useStore.setState({ files: loadedFiles, activeFile: Object.keys(loadedFiles)[0] })
        } catch (error) {
          alert('Error loading file: ' + error.message)
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleReset = () => {
    console.log('Reset button clicked')
    resetFiles()
    // Force a hard reset
    window.location.reload()
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#1e1e1e'
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        background: '#252526',
        borderBottom: '1px solid #333'
      }}>
        <h1 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'white',
          margin: 0
        }}>
          ⚡ Code Playground
        </h1>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={toggleLayout}
            style={{
              padding: '6px 12px',
              background: '#3c3c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#4c4c4c'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3c3c3c'}
          >
            <Layout size={16} />
            {layout === 'horizontal' ? 'Vertical' : 'Horizontal'}
          </button>
          
          <button
            onClick={handleReset}
            style={{
              padding: '6px 12px',
              background: '#3c3c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#4c4c4c'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3c3c3c'}
          >
            <RotateCcw size={16} />
            Reset
          </button>
          
          <button
            onClick={handleSave}
            style={{
              padding: '6px 12px',
              background: '#0e639c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1177bb'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#0e639c'}
          >
            <Save size={16} />
            Save
          </button>
          
          <button
            onClick={handleLoad}
            style={{
              padding: '6px 12px',
              background: '#3c3c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#4c4c4c'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3c3c3c'}
          >
            <FolderOpen size={16} />
            Load
          </button>
        </div>
      </div>

      {/* Tabs */}
      <EditorTabs />

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <ResizableLayout />
      </div>
    </div>
  )
}

export default App
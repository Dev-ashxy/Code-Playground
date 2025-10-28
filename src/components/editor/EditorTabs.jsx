import { useStore } from '../../store/useStore'
import { X } from 'lucide-react'

function EditorTabs() {
  const { files, activeFile, setActiveFile, deleteFile } = useStore()

  return (
    <>
      {Object.keys(files).map((fileName) => (
        <div
          key={fileName}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRight: '1px solid #333',
            background: activeFile === fileName ? '#2d2d2d' : '#1e1e1e',
            color: activeFile === fileName ? '#fff' : '#888',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
          onClick={() => setActiveFile(fileName)}
          onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
          onMouseLeave={(e) => {
            if (activeFile !== fileName) e.currentTarget.style.color = '#888'
          }}
        >
          {fileName}
          {Object.keys(files).length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (activeFile === fileName) {
                  const fileNames = Object.keys(files)
                  const index = fileNames.indexOf(fileName)
                  const newActive = fileNames[index === 0 ? 1 : index - 1]
                  setActiveFile(newActive)
                }
                deleteFile(fileName)
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>
      ))}
    </>
  )
}

export default EditorTabs
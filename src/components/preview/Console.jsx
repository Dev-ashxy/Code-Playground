
import { useStore } from '../../store/useStore'
import { Terminal, Trash2 } from 'lucide-react'

function Console() {
  const { consoleLogs, clearConsole } = useStore()

  const getLogColor = (method) => {
    switch (method) {
      case 'error': return '#ff6b6b'
      case 'warn': return '#ffd93d'
      default: return '#a8dadc'
    }
  }

  return (
    <div style={{ background: '#222', color: '#fff', padding: '16px', borderRadius: '8px', fontFamily: 'monospace' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={18} />
          Console
        </span>
        <button
          onClick={clearConsole}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '4px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#333'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
          title="Clear console"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {consoleLogs.length === 0 ? (
          <div style={{ color: '#888' }}>No console output yet</div>
        ) : (
          consoleLogs.map((log, index) => (
            <div key={index} style={{ color: getLogColor(log.method), marginBottom: '4px' }}>
              {log.data.map((item, i) => (
                <span key={i}>
                  {typeof item === 'object' ? JSON.stringify(item, null, 2) : String(item)}
                  {i < log.data.length - 1 ? ' ' : ''}
                </span>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Console
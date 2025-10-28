import { useStore } from '../../store/useStore'
import CodeEditor from '../editor/CodeEditor'
import PreviewPane from '../preview/PreviewPane'
import Console from '../preview/Console'

function ResizableLayout() {
  const { layout } = useStore()

  return (
    <div style={{
      display: 'flex',
      flexDirection: layout === 'horizontal' ? 'row' : 'column',
      height: '100%',
      width: '100%'
    }}>
      {/* Editor Section */}
      <div style={{
        flex: 1,
        minWidth: layout === 'horizontal' ? '300px' : 'auto',
        minHeight: layout === 'vertical' ? '300px' : 'auto',
        background: '#1e1e1e'
      }}>
        <CodeEditor />
      </div>

      {/* Divider */}
      <div style={{
        width: layout === 'horizontal' ? '4px' : '100%',
        height: layout === 'vertical' ? '4px' : '100%',
        background: '#333',
        cursor: layout === 'horizontal' ? 'col-resize' : 'row-resize'
      }} />

      {/* Preview + Console Section */}
      <div style={{
        flex: 1,
        minWidth: layout === 'horizontal' ? '300px' : 'auto',
        minHeight: layout === 'vertical' ? '300px' : 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Preview */}
        <div style={{ flex: 2, minHeight: '200px' }}>
          <PreviewPane />
        </div>

        {/* Console */}
        <div style={{ flex: 1, minHeight: '100px' }}>
          <Console />
        </div>
      </div>
    </div>
  )
}

export default ResizableLayout
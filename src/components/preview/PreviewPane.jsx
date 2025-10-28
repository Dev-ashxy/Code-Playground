
import { useEffect, useRef } from 'react'
import { useStore } from '../../store/useStore'

function PreviewPane() {
  const iframeRef = useRef(null)
  const { files, addConsoleLog, clearConsole } = useStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      updatePreview()
    }, 500)

    return () => clearTimeout(timer)
  }, [files])

  const updatePreview = () => {
    const iframe = iframeRef.current
    if (!iframe) return

    const html = files['index.html']?.value || ''
    const css = files['style.css']?.value || ''
    const js = files['script.js']?.value || ''

    const htmlDocument = `<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args) => {
      window.parent.postMessage({
        type: 'console',
        method: 'log',
        data: args
      }, '*');
      originalLog.apply(console, args);
    };

    console.error = (...args) => {
      window.parent.postMessage({
        type: 'console',
        method: 'error',
        data: args
      }, '*');
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      window.parent.postMessage({
        type: 'console',
        method: 'warn',
        data: args
      }, '*');
      originalWarn.apply(console, args);
    };

    window.onerror = (message, source, lineno, colno, error) => {
      window.parent.postMessage({
        type: 'console',
        method: 'error',
        data: [message]
      }, '*');
      return false;
    };

    try {
      ${js}
    } catch (error) {
      console.error(error.message);
    }
  </script>
</body>
</html>`

    iframe.srcdoc = htmlDocument
    clearConsole()
  }

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'console') {
        addConsoleLog({
          method: event.data.method,
          data: event.data.data,
          timestamp: new Date().toISOString()
        })
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [addConsoleLog])

  return (
    <div style={{ height: '100%', background: 'white' }}>
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="preview"
      />
    </div>
  )
}

export default PreviewPane
import { create } from 'zustand'

const defaultFiles = {
  'index.html': {
    name: 'index.html',
    language: 'html',
    value: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
</head>
<body>
  <div class="container">
    <h1>Hello World!</h1>
    <p>Start coding in the editor!</p>
    <button id="myBtn">Click me!</button>
  </div>
</body>
</html>`
  },
  'style.css': {
    name: 'style.css',
    language: 'css',
    value: `body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.container {
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: fadeIn 1s ease-in;
}

p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

button {
  padding: 12px 24px;
  font-size: 16px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

button:active {
  transform: scale(0.98);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`
  },
  'script.js': {
    name: 'script.js',
    language: 'javascript',
    value: `console.log("Welcome to Code Playground!");
console.log("Edit the code and see changes in real-time!");

// Get the button element
const btn = document.getElementById('myBtn');

if (btn) {
  // Add click event listener
  btn.addEventListener('click', () => {
    console.log('Button clicked!');
    
    // Change button text
    btn.textContent = 'Clicked!';
    
    // Show alert
    alert('Hello from JavaScript! Check the console for logs.');
    
    // Reset button text after 2 seconds
    setTimeout(() => {
      btn.textContent = 'Click me!';
      console.log('Button reset!');
    }, 2000);
  });
}

// Log a message after 3 seconds
setTimeout(() => {
  console.log('3 seconds have passed since page load!');
}, 3000);

// Example: Log current time
console.log('Current time:', new Date().toLocaleTimeString());`
  }
}

console.log('Store initialized with default files:', defaultFiles)

export const useStore = create((set) => ({
  files: defaultFiles,
  activeFile: 'index.html',
  layout: 'horizontal',
  consoleLogs: [],
  
  setActiveFile: (fileName) => {
    console.log('Setting active file to:', fileName)
    set({ activeFile: fileName })
  },
  
  updateFile: (fileName, newValue) => set((state) => ({
    files: {
      ...state.files,
      [fileName]: { ...state.files[fileName], value: newValue }
    }
  })),
  
  addFile: (fileName, language) => set((state) => ({
    files: {
      ...state.files,
      [fileName]: { name: fileName, language, value: '' }
    }
  })),
  
  deleteFile: (fileName) => set((state) => {
    const newFiles = { ...state.files }
    delete newFiles[fileName]
    const fileNames = Object.keys(newFiles)
    return { 
      files: newFiles,
      activeFile: fileNames.length > 0 ? fileNames[0] : null
    }
  }),
  
  toggleLayout: () => set((state) => ({
    layout: state.layout === 'horizontal' ? 'vertical' : 'horizontal'
  })),
  
  addConsoleLog: (log) => set((state) => ({
    consoleLogs: [...state.consoleLogs, log]
  })),
  
  clearConsole: () => {
    console.log('Clearing console logs')
    set({ consoleLogs: [] })
  },
  
  resetFiles: () => {
    console.log('Resetting to default files')
    set({ 
      files: defaultFiles, 
      activeFile: 'index.html',
      consoleLogs: []
    })
  }
}))
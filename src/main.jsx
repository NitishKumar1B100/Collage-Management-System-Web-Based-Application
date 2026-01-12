import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeCustomeProvider } from './context/Theme/ThemeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeCustomeProvider>
    <App />
    </ThemeCustomeProvider>
  </StrictMode>,
)

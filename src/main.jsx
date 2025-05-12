import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import SettingsProvider from './contexts/SettingsContext'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <HelmetProvider>
      <SettingsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SettingsProvider>
    </HelmetProvider>
  </StrictMode>
)

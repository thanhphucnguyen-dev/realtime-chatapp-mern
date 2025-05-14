import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import SettingsProvider from './contexts/SettingsContext'
import { HelmetProvider } from 'react-helmet-async'

import { store } from './redux/store'
import { Provider as ReduxProvider } from 'react-redux'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <SettingsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SettingsProvider>
      </ReduxProvider>
    </HelmetProvider>
  </StrictMode>
)

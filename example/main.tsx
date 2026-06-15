import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { MobiThemeProvider } from '../src'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MobiThemeProvider defaultTheme="system">
      <App />
    </MobiThemeProvider>
  </React.StrictMode>,
)

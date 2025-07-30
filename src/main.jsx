import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ProfilesProvider } from './context/ProfilesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProfilesProvider>
        <App />
      </ProfilesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

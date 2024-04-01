import React from 'react'
import ReactDOM from 'react-dom/client'
import PasswordGenerator from './components/PasswordGenerator.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PasswordGenerator />
  </React.StrictMode>,
)

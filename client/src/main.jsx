import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Thêm dòng này
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 2. Bao bọc App bằng BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
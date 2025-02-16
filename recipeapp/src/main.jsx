import { createRoot } from 'react-dom/client'
import React from 'react';
import { StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <App />
   </StrictMode>, 
)

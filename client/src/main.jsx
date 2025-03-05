window.process = { env: { NODE_ENV: import.meta.env.MODE } };
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter}from "react-router-dom"
import  AuthProvider  from './context/Auth';
createRoot(document.getElementById('root')).render(
 <AuthProvider>
 <BrowserRouter>

    <App/>
</BrowserRouter>
</AuthProvider>
)

window.process = { env: { NODE_ENV: import.meta.env.MODE } };
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter}from "react-router-dom"
import  AuthProvider  from './context/Auth';
import SearchProvider from './context/Search.jsx';
import CartProvider from './context/cart.jsx';
createRoot(document.getElementById('root')).render(
 <AuthProvider>
    <SearchProvider>
      <CartProvider>
 <BrowserRouter>

    <App/>
</BrowserRouter>
</CartProvider>
</SearchProvider>
</AuthProvider>
)

//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import './index.css'
import App from './App.jsx'
import { ContextProvider } from '../context.jsx'
import { CartProvider } from './Components/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <CartProvider>
    <WishlistProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </WishlistProvider>

    </CartProvider>
    </BrowserRouter>
    
 
  
  )

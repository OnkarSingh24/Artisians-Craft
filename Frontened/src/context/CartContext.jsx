import React from 'react'
import { useContext,createContext, useState } from 'react'

const CartContext = createContext();
export const useCart = ()=> useContext(CartContext);
export const CartProvider = ({children})=>{
    const [cartCount , setCartCount] = useState(0);

    const addToCart = () =>{
        setCartCount(a=>a+1);
    };
    return(
        <CartContext.Provider value={{cartCount,addToCart}}>
            {children}
        </CartContext.Provider>
    )
}
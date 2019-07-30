export const addItemToCart =(cartItems, itemToAdd)=>{
    const existingItem = cartItems.find(cartItem =>cartItem.id === itemToAdd.id);
    
    
    if(existingItem){
        return cartItems.map(cartItem => cartItem.id === itemToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1}
            :cartItem
        )
    }

    return [...cartItems, {...itemToAdd, quantity: 1}]
}

export const clearItemFromCart = (cartItems, itemToClear) =>{
    return cartItems.filter(cartItem => cartItem.id !== itemToClear.id)
}


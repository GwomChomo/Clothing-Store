import React from 'react';

import './cart-item.styles.scss';

const CartItem = ({key, item: {imageUrl, name, quantity, price}}) =>(
    <div key ={key} className ='cart-item'>
        <img alt ='item' src ={imageUrl} />
        <div className ='item-details'> 
            <span className ='name'>{name} </span>
            <span className ='price'>{quantity} x  ${price}</span>
        </div>
        
    </div>
);

export default CartItem;
import React from 'react';

import './checkout-item.styles.scss';

//redux stuff
import {connect} from 'react-redux';
import {clearItemFromCart} from '../../redux/cart/cart.actions'

const CheckoutItem =({cartItem, clearItem })=>{
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <div className ='checkout-item'>
            <div className ='image-container'>
                <img alt ='item' src ={imageUrl} />
            </div>
            <span className ='name'>{name}</span>
            <span className ='quantity'>{quantity}</span>
            <span className ='price'>${price}</span>
            <div className ='remove-button' onClick ={()=>clearItem(cartItem)}> &#10005;</div>
        </div>
    )
}

const mapDispatchToProps =dispatch=>({
    clearItem: cartItem => dispatch(clearItemFromCart(cartItem))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);
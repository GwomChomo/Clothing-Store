import React from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss';

//redux stuff
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.actions'
import {cartSelectorCount} from '../../redux/cart/cart.selectors';


const CartIcon =({toggleCartHidden, itemCount})=>(
    <div className ='cart-icon' onClick ={toggleCartHidden}>
        <ShoppingIcon className ='shopping-icon' />
        <span className ='item-count'>{itemCount}</span>
    </div>
)

const mapStateToProps =(state)=>({
    itemCount: cartSelectorCount(state)
})

const mapDispatchToProps =dispatch=>({
    toggleCartHidden: ()=>dispatch(toggleCartHidden())
})
 
export default connect(mapStateToProps, mapDispatchToProps) (CartIcon);
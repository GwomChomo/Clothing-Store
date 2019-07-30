import React from 'react';
import {Link} from 'react-router-dom';
import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg';

//components
import CartIcon from '../cart-icon/cart-icon.component'; 
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

//firebase utils
import {auth} from '../../firebase/firebase.utils';


//Redux utils
import {connect} from 'react-redux';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';

const Header =({currentUser, hidden})=>(
    <div className ="header">
        <Link to ='/' className ="logo-container" >
            <Logo className= "logo" />
        </Link>
        <div className ="options">
            <Link to ="/shop" className ="option">Shop</Link>
            <Link to ="/shop" className ="option">Contact</Link>
            {
                currentUser ? 
                <div className ='option' onClick ={()=>auth.signOut()}> Sign Out</div>
                :
                <Link className = 'option' to ='/signin'>Sign In</Link>
            }
            <CartIcon />
        </div>
        {
            !hidden && <CartDropdown />
        }
    </div>

)

const mapStateToProps = (state) =>({
    currentUser: selectCurrentUser(state),
    hidden: selectCartHidden(state)
})

//connect is a Higher Order Component that generates container components. It maps the state of the store as well as the dispatches to the store, to the props of the containers it generates.
export default connect(mapStateToProps)(Header);
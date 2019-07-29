import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg';

import {auth} from '../../firebase/firebase.utils';

const Header =({currentUser})=>(
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
        </div>
       
    </div>

)

const mapStateToProps = state =>({
    currentUser: state.user.currentUser
})

//connect is a Higher Order Component
export default connect(mapStateToProps)(Header);
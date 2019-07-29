import React from 'react';
import {Link} from 'react-router-dom';
import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg';

//firebase utils
import {auth} from '../../firebase/firebase.utils';

//Redux utils
import {connect} from 'react-redux';

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

//connect is a Higher Order Component that generates container components. It maps the state of the store as well as the dispatches to the store, to the props of the containers it generates.
export default connect(mapStateToProps)(Header);
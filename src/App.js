import React from 'react';
import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';

//components and pages
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';


//firebase stuff
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

//redux stuff
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions.js';

class  App extends React.Component {
  
  unsubscribeFromAuth = null

  componentDidMount(){
    const {setCurrentUser} = this.props;
    //open subscription to firebase. Adds an oberver to track changes in the user's sign in state.
    //Must be closed (by calling unsubscribe) when component is unmounted from the DOM. This ensures that there are no memory leaks 
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      //if userauth is not null (i.e if user is logged in), get the user's data from the documentRef object (which returns a snapshot).
      //The user data is gotten using the .data method of the snapshot. Set local state to the data
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>
        {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      }
      else{
        setCurrentUser(userAuth);
      }
        
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    
    return (
      <div>
        <Header />
        <Switch>
          <Route  exact path="/" component ={HomePage}/>
          <Route path="/shop" component ={ShopPage} />
          <Route exact path="/signin" render = {()=>this.props.currentUser? (<Redirect to='/' />): (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps =({user})=>({
  currentUser: user.currentUser
})

const mapDispatchToProps=dispatch=>({
  setCurrentUser: user=>dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

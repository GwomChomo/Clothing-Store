import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class  App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      currentUser: null
    }
  }
  
  unsubscribeFromAuth = null

  componentDidMount(){
    //open subscription to firebase. Adds an oberver to track changes in the user's sign in state.
    //Must be closed (by calling unsubscribe) when component is unmounted from the DOM. This ensures that there are no memory leaks 
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      //if userauth is not null (i.e if user is logged in), get the user's data from the documentRef object (which returns a snapshot).
      //The user data is gotten using the .data method of the snapshot. Set local state to the data
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>this.setState({
          currentUser: {
            id: snapShot.id,
            ...snapShot.data()
          }
        })
        )
      }
      else{
        //if user isn't logged in, set app state to null. 
        this.setState({
          currentUser: userAuth
        })
      }
      
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
          <Route  exact path="/" component ={HomePage}/>
          <Route path="/shop" component ={ShopPage} />
          <Route path="/signin" component ={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
  
}

export default App;

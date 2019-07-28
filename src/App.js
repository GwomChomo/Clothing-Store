import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import {auth} from './firebase/firebase.utils';

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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>{
      this.setState({currentUser: user})

      console.log(this.state.currentUser);
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

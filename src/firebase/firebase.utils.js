import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyACepWmiJJUOUVa1rADi1ydRZGiEddKiig",
    authDomain: "crown-db-b7037.firebaseapp.com",
    databaseURL: "https://crown-db-b7037.firebaseio.com",
    projectId: "crown-db-b7037",
    storageBucket: "",
    messagingSenderId: "1086096963284",
    appId: "1:1086096963284:web:1ec07dd233e86cd1"
  };

  export const createUserProfileDocument = async (userAuth, additionalData)=>{
      if(!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapshot  = await userRef.get();
      console.log(snapshot);

      //if user does not exist, create one and store in the database. If there is a snapshot of the user, none is created. This will avoid duplicates
      if(!snapshot.exists){
          const {displayName, email} = userAuth;
          const createdAt = new Date();

          try{
            await userRef.set({
                displayName,
                email,
                createdAt, 
                ...additionalData
            })
          }
          catch(error){console.log("Error creating user", error.message)}
      }
      return userRef;
  }


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = ()=>auth.signInWithPopup(provider);

export default firebase;
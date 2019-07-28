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


firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = ()=>auth.signInWithPopup(provider);

export default firebase;
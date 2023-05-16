import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
// import firebase from 'firebase';
// const {firebase} = require('firebase')

// import firebase from "firebase/app";
// import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCc3hrCNG86uLY6kxYPhVJg2QNYBr3HT7Q",
    authDomain: "wazapp-fc40f.firebaseapp.com",
    projectId: "wazapp-fc40f",
    storageBucket: "wazapp-fc40f.appspot.com",
    messagingSenderId: "472922232251",
    appId: "1:472922232251:web:047c5413282f94e848209e",
    measurementId: "G-0008QY6TLF"
}

const firebaseApp = initializeApp(firebaseConfig)
// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const db= firebaseApp.firestore()
const db= getFirestore(firebaseApp)
// const auth = firebase.auth()
const auth = getAuth(firebaseApp)
const provider = new GoogleAuthProvider()
// const provider = new auth.GoogleAuthProvider()
// const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
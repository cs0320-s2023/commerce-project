// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";
import { useState, useEffect } from "react";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYcSuozs_BSEDoZtemPot2gPsfrt3P6O0",
  authDomain: "sneakerbargains-15b15.firebaseapp.com",
  projectId: "sneakerbargains-15b15",
  storageBucket: "sneakerbargains-15b15.appspot.com",
  messagingSenderId: "1056538510538",
  appId: "1:1056538510538:web:6d32adcfa62bff0ce06033",
  measurementId: "G-GN7MD6P2PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const name = user.displayName;
    const email = user.email;
    const photoUrl = user.photoURL;

    localStorage.setItem('name', name || '');
    localStorage.setItem('email', email || '');
    localStorage.setItem('photoUrl', photoUrl || '');

    console.log(`Welcome ${name}!`);
    console.log(name, email, photoUrl);
  } else {
    // User is signed out
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('photoUrl');
    console.log('Please sign in');
    
  }
});



export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result");
        
        
        const name = result.user?.displayName;
        const email = result.user?.email;
        const photoUrl = result.user?.photoURL;

        localStorage.setItem('name', name || '');
        localStorage.setItem('email', email || '');
        localStorage.setItem('photoUrl', photoUrl || '');
        
       
        console.log(name, email, photoUrl);
        console.log(result);

        location.reload();

        console.log(result);

      })
      .catch((error) => {
        console.log(error);
      });
  };


  export const signOutWithGoogle = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);

      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('photoUrl');

      console.log(localStorage.getItem('name'));
      location.reload();

      })
      .catch((error) => {
        console.log(error);
      });
  };;
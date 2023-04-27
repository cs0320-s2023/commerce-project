// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
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


export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        
        const name = result.user?.displayName;
        const email = result.user?.email;
        const photoUrl = result.user?.photoURL;

        localStorage.setItem('name', name || '');
        localStorage.setItem('email', email || '');
        localStorage.setItem('photoUrl', photoUrl || '');
        location.reload();
       
        console.log(name, email, photoUrl);

      })
      .catch((error) => {
        console.log(error);
      });
  };
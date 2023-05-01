import {useEffect, useState} from "react"
import React, { Component } from "react";
import "../App.css"
import { auth, signInWithGoogle, signOutWithGoogle} from "../firebase"
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

export const GoogleSignIn  = () => {

    return(
            <div className="signin-container" role="signin-container">
                <div className="welcome-message"> Welcome {localStorage.getItem('name') ? localStorage.getItem('name') : 'Please sign in'}!</div>
                <button onClick={signInWithGoogle} className="google-btn">
                    <span className="google-text">Sign in!</span>
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
                </button>
                <button onClick={signOutWithGoogle} className="signout-btn">
                    <span className="signout-text">Sign Out!</span>
                </button>       
            </div>
    );

};


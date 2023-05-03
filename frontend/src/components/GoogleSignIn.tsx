import { signInWithGoogle, signOutWithGoogle} from "../firebase"
import "../App.css"
import {Alert, Button, Breadcrumb} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export const GoogleSignIn  = () => {


    // TSX to display when the user is signed out.
    const showSignIn = () => {

        return( 
            <Button onClick={signInWithGoogle} className="google-btn">
                <span className="google-text">Sign in!</span>
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
            </Button>
        )
    } 

    // TSX to display when the user is signed in.
    const showSignOut = () => {

        return( 
            <Button onClick={signOutWithGoogle} className="google-btn">
                <span className="signout-text">Sign Out!</span>
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
            </Button>
        )
    } 

    const username = localStorage.getItem('name');
    const signedIn = (username != undefined) && (username.length) > 0;
  
    return(
            <div className="signin-container" role="signin-container">
                <Alert variant = "dark" className="welcome-message"> Welcome, {localStorage.getItem('name') ? localStorage.getItem('name') : 'please sign in'}!</Alert>
                {signedIn?showSignOut():showSignIn()}
            </div>
    );
    } 


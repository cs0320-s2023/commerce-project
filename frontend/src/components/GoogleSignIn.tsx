import { signInWithGoogle, signOutWithGoogle} from "../firebase"
import "../App.css"

export const GoogleSignIn  = () => {


    // TSX to display when the user is signed out.
    const showSignIn = () => {

        return( 
            <button onClick={signInWithGoogle} className="google-btn">
                <span className="google-text">Sign in!</span>
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
            </button>
        )
    } 

    // TSX to display when the user is signed in.
    const showSignOut = () => {

        return( 
            <button onClick={signOutWithGoogle} className="google-btn">
                <span className="signout-text">Sign Out!</span>
                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google logo" />
            </button>
        )
    } 

    const username = localStorage.getItem('name');
    const signedIn = (username != undefined) && (username.length) > 0;
  
    return(
            <div className="signin-container" role="signin-container">
                <div className="welcome-message"> Welcome {localStorage.getItem('name') ? localStorage.getItem('name') : 'Please sign in'}!</div>
    
                {signedIn?showSignOut():showSignIn()}
            </div>
    );
    } 


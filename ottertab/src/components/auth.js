import React, { useState, useEffect } from 'react';
import { gapi, loadAuth2 } from 'gapi-script';

const config = {
    clientId: process.env.REACT_APP_GAPI_CLIENT_ID,
    apiKey: process.env.REACT_APP_GAPI_API_KEY,
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  }

export const Auth = (props) => {
    const calendar = 'primary';
    
    const [signedIn, setSignedIn] = useState(false);


    const initClient = () => {
        window.gapi.client.init(config).then(() => {
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(setSignedIn);
            setSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        }).catch((e) => {
            console.log(e);
        });
    }

    const handleAuthClick = () => {
        window.gapi.auth2.getAuthInstance().signIn();
        setSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    }

    const handleSignoutClick = () => {
        window.gapi.auth2.getAuthInstance().signOut();
        setSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    }


   useEffect(() => {
        const initAuth = async () => {
            await window.gapi.load('client:auth2', initClient);
        }
        initAuth();
   }, []);

   return <React.Fragment>
       <button onClick={(e) => handleAuthClick()}>Sign in</button>
   </React.Fragment>

}

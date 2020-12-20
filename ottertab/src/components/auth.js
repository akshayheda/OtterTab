import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

// Grab config from secret environment variables to link into google api
const config = {
    clientId: process.env.REACT_APP_GAPI_CLIENT_ID,
    apiKey: process.env.REACT_APP_GAPI_API_KEY,
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
}

// Component to handle sign in/sign out and load google api. Also manages logged-in state for global app.
export const Auth = ({setLoaded, setIsSignedIn}) => {    
    // internal state to use for signing in and out
    const [signedIn, setSignedIn] = useState(false);
    const [loaded, setLocalLoaded] = useState(false);

    // hack for loading in google api
    const initClient = () => {
        window.gapi.client.init(config).then(() => {
            // callback to update state on signed in
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(
                (val) => { 
                    setSignedIn(val); 
                    setIsSignedIn(val); 
                    // use session storage to store logged in status 
                    sessionStorage.setItem('signedIn', JSON.stringify(val));
                });
                // pull session storage to get logged in status on refresh
                let stored_val = JSON.parse(sessionStorage.getItem('signedIn'));
                console.log("Session Storage: " +  stored_val);
                if (stored_val == true) {
                    setSignedIn(true)
                } else {
                    setSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
                }
                // update component state and use props to update app state
                setLocalLoaded(true);
                setIsSignedIn(stored_val);
                setLoaded(true);
        }).catch((e) => {
            console.log(e);
        });
    }
    // function to login. State variables are updated by the listener.
    const handleAuthClick = () => {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    // function to logout. State variables are updated by the listener.
    const handleSignoutClick = () => {
        window.gapi.auth2.getAuthInstance().signOut();
    }

    // load gapi upon rendering
    useEffect(() => {
        const initAuth = async () => {
            await window.gapi.load('client:auth2', initClient);
        }
        initAuth();
    }, []);

    // once gapi is loaded, add the login/logout button. Have it be a loader.
    if (loaded) {
        return <React.Fragment>
            <Button type="primary" icon={<GoogleOutlined />} 
                onClick={(e) => {signedIn? handleSignoutClick(): handleAuthClick()}}>
                {signedIn? "Sign Out": "Sign In"}
            </Button>
        </React.Fragment>
    }

    return <React.Fragment>
        <Button type="primary" icon={<GoogleOutlined />} 
            onClick={(e) => {signedIn? handleSignoutClick(): handleAuthClick()}} loading>
            Loading...
        </Button>
    </React.Fragment>



}

import React, { useState, useEffect } from 'react';
import { gapi, loadAuth2 } from 'gapi-script';
import { Button } from 'antd';
import { ReactComponent as Logo } from '../assets/images/google-logo.svg';
import { GoogleOutlined } from '@ant-design/icons';

const config = {
    clientId: process.env.REACT_APP_GAPI_CLIENT_ID,
    apiKey: process.env.REACT_APP_GAPI_API_KEY,
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
}

export const Auth = ({setLoaded}) => {
    const calendar = 'primary';
    
    const [signedIn, setSignedIn] = useState(false);

    const initClient = () => {
        window.gapi.client.init(config).then(() => {
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(setSignedIn);
            setSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            setLoaded(true);
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
        <Button type="primary" icon={<GoogleOutlined />} onClick={(e) => {signedIn? handleSignoutClick(): handleAuthClick()}}>
            {signedIn? "Sign Out": "Sign In"}
        </Button>
    </React.Fragment>

}

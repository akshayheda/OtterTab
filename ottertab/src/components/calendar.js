import React, { useState, useEffect } from 'react';
import { gapi, loadAuth2 } from 'gapi-script';

const config = {
    clientId: process.env.REACT_APP_GAPI_CLIENT_ID,
    apiKey: process.env.REACT_APP_GAPI_API_KEY,
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  }

export const Calendar = (props) => {
    const calendar = 'primary';
    const [signedIn, setSignedIn] = useState(false);

    const initClient = () => {
        gapi.client.init(config).then(() => {
            gapi.auth2.getAuthInstance().isSignedIn.listen(setSignedIn);
            setSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
        }).catch((e) => {
            console.log(e);
        });
    }

    const handleAuthClick = () => {
        gapi.auth2.getAuthInstance().signIn();
    }

    const handleSignoutClick = () => {
        gapi.auth2.getAuthInstance().signOut();
    }


    const listUpcomingEvents = async (maxResults)  => {
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then((response) => {
            console.log(response.result.items);
        }).catch((e) => {
            console.log(e);
        });
   }

   useEffect(() => {
        const initAuth = async () => {
            await gapi.load('client:auth2', initClient);
        }
        initAuth();
   }, []);

   return <React.Fragment>
       <button onClick={(e) => handleAuthClick()}>Sign in</button>
       <button onClick={(e) => listUpcomingEvents(10)}>list</button>
   </React.Fragment>

}

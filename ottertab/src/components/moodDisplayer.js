import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Space, Calendar, Modal } from 'antd';
import firebase from "./firebase.js";
import { MoodCalendar } from './moodCalendar.js';


export const MoodDisplayer = ({isSignedIn, loaded}) => {
    const [calendarVisible, setVisible] = useState(false);
    let userId;
    console.log(isSignedIn, loaded)
    if (!isSignedIn || !loaded) {
        return <></>
    } else {
        console.log("signed in: " + isSignedIn + '\tloaded: ' + loaded);
        userId = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
    }

    console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get())

    
    return (
        <>
          <Button type="primary" onClick={() => setVisible(true)}>
            Mood Calendar
          </Button>
          <Modal title="Mood Calendar" visible={calendarVisible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} footer={null}>
            <MoodCalendar userId={userId}/>
          </Modal>
        </>
      );

}
import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Space, Calendar, Modal } from 'antd';
import firebase from "./firebase.js";
import { MoodCalendar } from './moodCalendar.js';


export const MoodDisplayer = (loaded) => {
    const [calendarVisible, setVisible] = useState(false);

    if (!loaded || window.gapi.auth2 == null || window.gapi.auth2.getAuthInstance().currentUser == null) {
        return <></>
    }

    console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get())
    let userId = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();

    
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
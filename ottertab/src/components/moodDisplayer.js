import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Space, Calendar, Modal } from 'antd';
import firebase from "./firebase.js";
import { MoodCalendar } from './moodCalendar.js';
import { SmileOutlined } from '@ant-design/icons';

export const MoodDisplayer = ({isSignedIn, loaded}) => {
    const [calendarVisible, setVisible] = useState(false);
  
    const [hover, setHover] = useState(false);

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
          <Button type="primary" shape='circle' size='large' onClick={() => setVisible(true)} icon={<SmileOutlined />}
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}>
          </Button>
          {hover? <h3 style={{display: 'inline-block', marginTop: 0.3 + 'rem', marginLeft: 0.6 + 'rem'}}>Track your mood</h3>: <></>}
          <Modal title="Mood Calendar" visible={calendarVisible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} footer={null}>
            <MoodCalendar userId={userId}/>
          </Modal>
        </>
      );

}
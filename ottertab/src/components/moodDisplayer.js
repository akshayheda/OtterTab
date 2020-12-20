import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { MoodCalendar } from './moodCalendar.js';
import { SmileOutlined } from '@ant-design/icons';

// Component that provides modal that pops out mood data
export const MoodDisplayer = ({isSignedIn, loaded}) => {
    // state variables to track whether to show modal and tooltip text
    const [calendarVisible, setVisible] = useState(false);
    const [hover, setHover] = useState(false);

    // if user not signed in, return nothing
    let userId;
    console.log(isSignedIn, loaded)
    if (!isSignedIn || !loaded) {
        return <></>
    } else {
        userId = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
    }

    // return back modal, with hovering showing a tooltip
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
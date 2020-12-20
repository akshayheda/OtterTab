import React from 'react';
import { Button, Row, Col, Space } from 'antd';
import firebase from "./firebase.js";
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';

const DATE_OPTIONS = {year: 'numeric', month: 'numeric', day: 'numeric'};

export const MoodTracker = ({isSignedIn, loaded}) => {
    let userId;
    if (!isSignedIn || !loaded) {
        return <></>
    } else {
        console.log("signed in: " + isSignedIn + '\tloaded: ' + loaded);
        userId = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
    }
    console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get())
    const sendMood = (userId, mood) => {
        let date = new Date().toLocaleString('en-US', DATE_OPTIONS).replace(/\//g, '-');
        let timestamp = Date.now();
        console.log(timestamp)
        firebase
        .firestore()
        .collection("users").doc(userId)
        .collection("mood").doc(date)
        .set({
            mood,
            timestamp
        });
    }

    return <div>
        <h3>How are you feeling today?</h3>
        <Space direction='horizontal'>
            <Button shape='circle' size='large' type='primary' 
                icon={<SmileOutlined />} 
                onClick={() => sendMood(userId, 'happy')} 
                style={{backgroundColor: '#0CC078', borderColor: '#0CC078'}}>
            </Button>
            <Button shape='circle' size='large' type='primary' 
                icon={<MehOutlined />} 
                onClick={() => sendMood(userId, 'neutral')} 
                style={{backgroundColor: '#ffc600', borderColor: '#ffc600'}}>
            </Button>
            <Button shape='circle' size='large' type='primary' 
                icon={<FrownOutlined />}
                onClick={() => sendMood(userId, 'sad')}
                style={{backgroundColor: '#DC143C', borderColor: '#DC143C'}}>
            </Button>
        </Space>
    </div>
        
}
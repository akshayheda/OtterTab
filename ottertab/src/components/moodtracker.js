import React from 'react';
import { Button, Space } from 'antd';
import firebase from "./firebase.js";
import { SmileOutlined, MehOutlined, FrownOutlined } from '@ant-design/icons';

const DATE_OPTIONS = {year: 'numeric', month: 'numeric', day: 'numeric'};

// button array to input in mood to firebase
export const MoodTracker = ({isSignedIn, loaded}) => {
    // check if user is signed in, if not return nothing
    let userId;
    if (!isSignedIn || !loaded) {
        return <></>
    } else {
        userId = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
    }

    // setter function to make database call
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

    // return 3 buttons for the moods supported
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
import React from 'react';
import { Button, Row, Col, Space } from 'antd';
import firebase from "./firebase.js";

const DATE_OPTIONS = {year: 'numeric', month: 'numeric', day: 'numeric'};

export const MoodTracker = (loaded) => {
    if (!loaded || window.gapi.auth2 == null || window.gapi.auth2.getAuthInstance().currentUser == null) {
        return <></>
    }
    console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get())
    let userId = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
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

    return <Space direction='horizontal'>
            <Button shape='circle' type='primary' onClick={() => sendMood(userId, 'happy')}>Happy</Button>
            <Button shape='circle' type='primary' onClick={() => sendMood(userId, 'neutral')}>Neutral</Button>
            <Button shape='circle' type='primary' danger={true} onClick={() => sendMood(userId, 'sad')}>Sad</Button>
        </Space>
}
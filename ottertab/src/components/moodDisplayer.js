import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Space, Calendar, Modal } from 'antd';
import firebase from "./firebase.js";


const GetMoods = (userId) => {
    const [moods, setMoods] = useState([]);
  
    useEffect(() => {
      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("mood")
        .onSnapshot(snapshot => {
          const moods = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
  
          setMoods(moods);
        });
    }, []);
  
    return moods;
}


const DATE_OPTIONS = {year: 'numeric', month: 'numeric', day: 'numeric'};


export const MoodDisplayer = (loaded) => {
    const [calendarVisible, setVisible] = useState(false);

    if (!loaded || window.gapi.auth2 == null || window.gapi.auth2.getAuthInstance().currentUser == null) {
        return <></>
    }
    console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get())
    let userId = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
    const moods = GetMoods(userId);

    function onPanelChange(value, mode) {
        console.log(value, mode);
      }
      
    function onFullRender(date){
        let day = date.date();
        let ref_id = date.format('MM-DD-YYYY');
        let mood = moods.find(objs => objs.id == (ref_id));
        let style;
        if (mood) {
            if (mood.mood === 'happy') {
                style = { border: "5px solid #0CC078", borderRadius: '10px'};
            }
            if (mood.mood === 'neutral') {
                style = { border: "5px solid #ffc600", borderRadius: '10px'};
            }
            if (mood.mood === 'sad') {
                style = { border: "5px solid #DC143C", borderRadius: '10px'};
            }
        }
        return <div style={style}>{day}</div>;
      }
      

    console.log(moods);
    return (
        <>
          <Button type="primary" onClick={() => setVisible(true)}>
            Mood Calendar
          </Button>
          <Modal title="Mood Calendar" visible={calendarVisible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} footer={null}>
            <Calendar fullscreen={false} onPanelChange={onPanelChange} dateFullCellRender={onFullRender}/>;
          </Modal>
        </>
      );

}
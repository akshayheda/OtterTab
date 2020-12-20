import React, { useState, useEffect } from 'react';
import { Calendar } from 'antd';
import firebase from "./firebase.js";

// helper function to make firebase datastore call
function useMoods(userId) {
    const [moods, setMood] = useState([]);
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
  
          setMood(moods);
        });
    }, []);
  
    return moods;
  }


// component that returns color coded calendar
export const MoodCalendar = ({userId}) => {

    const moods = useMoods(userId);
    function onPanelChange(value, mode) {
        console.log(value, mode);
      }
      
    function onFullRender(date){
        // query moods to find mood associated with that date
        let ref_id = date.format('MM-DD-YYYY');
        let mood = moods.find(objs => objs.id == (ref_id));
        let style;
        // map moods to colors
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
        return <div style={style}>{date.date()}</div>;
      }



    return <Calendar fullscreen={false} onPanelChange={onPanelChange} dateFullCellRender={onFullRender}/>;
}
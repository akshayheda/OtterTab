import React, { useState } from "react";
import firebase from "./firebase.js";
import { Button, Input, Space } from 'antd';

const { TextArea } = Input;

// Text input component that makes calls to firebase
export const AddNote = ({userId}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // firebase push function. Accesses path users/notes/{note}
  const addNote = () => {
    let timestamp = Date.now();
    firebase
      .firestore()
      .collection("users").doc(userId)
      .collection("notes")
      .add({
        timestamp,
        title,
        body
      });
    setTitle("");
    setBody("");
  };

  return (
    <Space direction='vertical' style={{width: '100%'}}>
      <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="title" />
      <TextArea rows={4} value={body} onChange={e => setBody(e.target.value)} placeholder="body"/>
      <Button onClick={addNote} style={{width: '100%'}}>Add Note</Button>
    </Space>
  );
};

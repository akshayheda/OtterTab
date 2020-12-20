import React, { useState, useEffect } from "react";
import firebase from "./firebase.js";
import { List, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

// helper function to get notes for a user
function useLists(userId) {
  const [lists, setLists] = useState([]);
  console.log("NOTES:" + userId);
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("notes")
      .onSnapshot(snapshot => {
        const lists = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // sort rever chronological
        setLists(lists.sort((first, second) => second.timestamp - first.timestamp));
      });
  }, []);

  return lists;
}

// delete function to remove from database
const handleOnDelete = (itemId, userId) => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("notes")
      .doc(itemId)
      .delete();
  };

// list component to show and delete notes
export const NoteLists = ({userId}) => {
  const lists = useLists(userId);

  return <List
        dataSource={lists}
        size='small'
        renderItem = { list => (
            <List.Item key={list.id} actions= {[<Button size='small' shape='circle' danger={true} icon={<CloseOutlined />} onClick={() => handleOnDelete(list.id, userId)}></Button>]}>
                <List.Item.Meta title={<b>{list.title}</b>} description={list.body}/>
            </List.Item>
        )

        }
    />;
}
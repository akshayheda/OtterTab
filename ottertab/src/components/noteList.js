import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./firebase.js";
import { List } from 'antd';

function useLists(userId) {
  const [lists, setLists] = useState([]);

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

        setLists(lists.sort((first, second) => second.timestamp - first.timestamp));
      });
  }, []);

  return lists;
}

export const NoteLists = ({userId}) => {
  const lists = useLists(userId);

  const handleOnDelete = id => {
    firebase
      .firestore()
      .collection(userId)
      .collection("notes")
      .doc(id)
      .delete();
  };

  console.log(lists)

  return <List
        dataSource={lists}
        size='small'
        renderItem = { list => (
            <List.Item>
                <List.Item.Meta title={<b>{list.title}</b>} description={list.body}/>
            </List.Item>
        )

        }
    />;
}
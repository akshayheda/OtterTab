import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "./firebase.js";
import { List, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

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

const handleOnDelete = (itemId, userId) => {
    firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("notes")
      .doc(itemId)
      .delete();
  };


export const NoteLists = ({userId}) => {
  const lists = useLists(userId);

  console.log(lists)

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
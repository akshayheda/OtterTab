import React, { useState } from 'react';
import { Button, Drawer, Divider, Space } from 'antd';
import { AddNote } from './addNote.js';
import { NoteLists } from './noteList.js';

export const Notes = (loaded) => {
    const [visible, setVisible] = useState(false);

    if (!loaded || window.gapi.auth2 == null || window.gapi.auth2.getAuthInstance().currentUser == null) {
        return <></>
    }
    console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get())
    let userId = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
    return <>
        <Button type="primary" shape='circle' onClick={() => setVisible(true)}>
                Open
            </Button>
        <Drawer
        title="Notes"
        placement='left'
        closable={true}
        onClose={() => setVisible(false)}
        visible={visible}
        key='left'
    >
        <Space direction='vertical' size='middle' style={{width: '100%'}}>
            <AddNote userId = {userId}/>
            <NoteLists userId = {userId}/>
        </Space>
    </Drawer>
  </>
}
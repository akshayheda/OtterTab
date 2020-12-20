import React, { useState } from 'react';
import { Button, Drawer, Divider, Space } from 'antd';
import { AddNote } from './addNote.js';
import { NoteLists } from './noteList.js';
import { FormOutlined } from '@ant-design/icons';

export const Notes = (loaded) => {
    const [visible, setVisible] = useState(false);

    const [hover, setHover] = useState(false);

    if (!loaded || window.gapi.auth2 == null || window.gapi.auth2.getAuthInstance().currentUser == null) {
        return <></>
    }
    console.log(window.gapi.auth2.getAuthInstance().isSignedIn.get())
    let userId = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();

    return <>
        <Button type="primary" shape='circle' size='large' icon={<FormOutlined />} 
            onClick={() => setVisible(true)} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)} />
            {hover? <h3 style={{display: 'inline-block', marginTop: 0.3 + 'rem', marginLeft: 0.6 + 'rem'}}>Notes</h3>: <></>}
            <Drawer
                title="Notes"
                placement='left'
                closable={true}
                onClose={() => setVisible(false)}
                
                visible={visible}
                key='left'
                width='400'
            >
        <Space direction='vertical' size='middle' style={{width: '100%'}}>
            <AddNote userId = {userId}/>
            <NoteLists userId = {userId}/>
        </Space>
    </Drawer>
  </>
}
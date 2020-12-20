import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import { AddNote } from './addNote.js';
import { NoteLists } from './noteList.js';
import { FormOutlined } from '@ant-design/icons';

// top level notes component that provides button and sidebar
export const Notes = ({isSignedIn, loaded}) => {
    // state on when to show sidebar and tooltip
    const [visible, setVisible] = useState(false);
    const [hover, setHover] = useState(false);

    // check if user is signed in, else return nothing
    let userId;
    if (!isSignedIn || !loaded) {
        return <></>
    } else {
        userId = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
    }
   
    // return a button with tooltip on hover, that links to a drawer.
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
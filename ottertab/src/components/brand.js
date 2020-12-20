import React, { useState } from 'react';
import { Button } from 'antd';
import otterface from '../assets/images/otter_face.png';

export const Brand = () => {
    return <span>
        <Button type="primary" shape='circle' size='large' logo={otterface} 
            onClick={() => window.open('#', '_blank')} >
            <img src={otterface} alt="Logo" width='25' height='25'/>
        </Button>
        <h2 style={{display: 'inline-block', marginBottom: 0, marginLeft: 0.6 + 'rem'}}>OtterTab</h2>
    </span>
}
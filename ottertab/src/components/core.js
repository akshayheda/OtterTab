import React from 'react';
import { Clock } from './clock.js';
import { Day } from './day.js';
import { SearchBar } from './search.js';

import {Row, Col} from 'antd';


export const Center = () => {
    return <div>
            <Row justify='center'>
                <Clock/> 
            </Row>
            <Row justify='center'>
                <Day/>
            </Row>
            <Row justify='center' span={12}>
                <SearchBar/>
            </Row>
        </div>;
}
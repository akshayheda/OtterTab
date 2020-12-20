import React from 'react';
import { Clock } from './clock.js';
import { Day } from './day.js';
import { SearchBar } from './search.js';
import { Calendar } from './calendar.js';

import {Row, Col} from 'antd';

export const Center = (loaded) => {
    return <Col justify='center' style={{position: 'relative', top: 5 + 'rem', margin: 'auto', padding: 1 + 'rem', width: 100 + '%', maxWidth: 50 + 'rem'}}>
        <Row justify='center' style={{}}>
            <Clock/> 
        </Row>
        <Row justify='center' style={{marginBottom: 1 + 'rem'}}>
            <Day/>
        </Row>
        <Row justify='center' style={{marginBottom: 2 + 'rem'}} span={12}>
            <SearchBar/>
        </Row>
        <Calendar loaded={loaded}/>
        
    </Col>
}
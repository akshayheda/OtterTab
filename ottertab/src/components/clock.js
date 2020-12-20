// import statements
import React, {useState, useEffect} from 'react';
import { Text } from './text.js';

// time options to get hh:mm format
const TIME_OPTIONS = {'hour12':true, hour:'numeric', minute:'numeric', second: 'numeric'};


// component that provides updating clock
export const Clock = () => {

    // function to get time in hh:mm format
    const getCurrentTime = () => {
        return new Date().toLocaleString('en-US', TIME_OPTIONS);
    }
    const [time, setTime] = useState(getCurrentTime);


    // update time without infinite loops
    useEffect(() => {
        setInterval(() => {
            setTime(getCurrentTime());
          }, 1000);
    });

    // code to have flashing semicolon
    let count = time.split(' ');
    count[0] = count[0].split(':');

    if (parseInt(count[0][2]) % 2 === 0) {
        return <Text style={{fontSize: 5 + 'rem', marginBottom: 0}}>
            {count[0][0]}<span style={{opacity: 0}}>{':'}</span>{count[0][1] + ' ' + count[1]}
        </Text>
    } else {
        return <Text style={{fontSize: 5 + 'rem', marginBottom: 0}}>{count[0][0] + ':' + count[0][1] + ' ' + count[1]}</Text>
    }

}


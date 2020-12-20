// import statements
import React, {useState, useEffect} from 'react';
import { Text } from './text.js';

// options to be passed into the date object
// TODO: make options settable
const TIME_OPTIONS = {'hour12':true, hour:'numeric', minute:'numeric'};




// components can be defined as functions using arrow notation
export const Clock = () => {
    // can have functions within functions (also using arrow notation)
    const getCurrentTime = () => {
        return new Date().toLocaleString('en-US', TIME_OPTIONS);
    }

    // state is defined as a name, and setter variable.
    const [time, setTime] = useState(getCurrentTime);

    // dw about this. This is the same as ComponentDidMount (i.e. is actually visible)
    useEffect(() => {
        setInterval(() => {
            setTime(getCurrentTime());
          }, 1000);
    });

    // a functional component returns back what it wants to be displayed.
    return <Text style={{fontSize: 5 + 'rem', marginBottom: 0}}>{time}</Text>
}


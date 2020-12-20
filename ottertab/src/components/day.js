import React, {useState, useEffect} from 'react';
import { Text } from './text.js';


const DATE_OPTIONS = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

// Component to return day, date, and year
export const Day = () => {
    const getCurrentDay = () => {
        return new Date().toLocaleString('en-US', DATE_OPTIONS);
    }
    
    const [day, setDay] = useState(getCurrentDay);

    // update date every minute
    useEffect(() => {
        setInterval(() => {
            setDay(getCurrentDay());
          }, 60*1000);
    });
    return <Text level={2}>{day}</Text>
}


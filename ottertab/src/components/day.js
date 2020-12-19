import React, {useState, useEffect} from 'react';

const DATE_OPTIONS = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};


export const Day = () => {
    const getCurrentDay = () => {
        return new Date().toLocaleString('en-US', DATE_OPTIONS);
    }

    const [day, setDay] = useState(getCurrentDay);

    useEffect(() => {
        setInterval(() => {
            setDay(getCurrentDay());
          }, 60*1000);
    });
    return <h1>{day}</h1>
}


import React, { useState, useEffect } from 'react';
import { Card, Divider, Col } from 'antd';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const { Meta } = Card;

const TIME_OPTIONS = {'hour12':true, hour:'numeric', minute:'numeric'};
const DATE_OPTIONS = {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
const SHORT_DATE_OPTIONS = {weekday: 'short', month: 'short', day: 'numeric'};

export const CalendarEvent = (event) => {

    let firstLine = "";
    let secondLine = "";

    if ('date' in event.event.start) {
        let startDate = new Date(event.event.start.date);
        firstLine = startDate.toLocaleString('en-US', DATE_OPTIONS);
    } else {
        let startDate = new Date(event.event.start.dateTime);
        let endDate = new Date(event.event.end.dateTime);

        // The event starts and ends on the same day
        if (startDate.toDateString() === endDate.toDateString()) {
            firstLine = startDate.toLocaleString('en-US', TIME_OPTIONS).toLowerCase() + ' — ' + endDate.toLocaleString('en-US', TIME_OPTIONS).toLowerCase();
            secondLine = startDate.toLocaleString('en-US', DATE_OPTIONS);
        } else {
            firstLine = startDate.toLocaleString('en-US', TIME_OPTIONS) + ' ' + startDate.toLocaleString('en-US', SHORT_DATE_OPTIONS);
            secondLine = '— ' + endDate.toLocaleString('en-US', TIME_OPTIONS) + ' ' + endDate.toLocaleString('en-US', SHORT_DATE_OPTIONS);
        }
    }

    console.log(event);
    return <Card hoverable size="large" style={{ margin: 0.5 + 'rem', height: 15 + 'rem', overflowY: 'scroll' }} 
        onClick={() => window.open(event.event.htmlLink, '_blank')}>
        <h3>
            {event.event.summary} 
        </h3>
        <p style={{color: 'slategrey'}}>
            {firstLine}
            <br />
            {secondLine}
        </p>
        <Divider style={{marginTop: 1 + 'rem', marginBottom: 1 + 'rem'}}/>
        <p style={{wordWrap: 'break-word', marginBottom: 0}}>
            <div dangerouslySetInnerHTML={{ __html: event.event.description }} />
        </p>
    </Card>

}

export const Calendar = ({loaded, isSignedIn}) => {

    const [events, setEvents] = useState([]);
    const [eventsLoaded, setEventsLoaded] = useState(false);
    console.log("signed in: " + isSignedIn + '\tloaded: ' + loaded);


    if (!loaded || !isSignedIn) { return <></> }

    const listUpcomingEvents = async (maxResults)  => {
        let start = new Date();
        start.setHours(0,0,0,0);
        let end = new Date();
        end.setHours(23,59,59,999);

        window.gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': start.toISOString(),
            'timeMax': end.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then((response) => {
            console.log(response.result.items);
            setEvents(response.result.items);
        }).catch((e) => {
            console.log(e);
        });
    }

    if (!eventsLoaded && loaded && window.gapi.auth2 != null) {
        if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
            setEventsLoaded(true);
            listUpcomingEvents();
        }
    }

    const responsive = {
        desktop: {
          breakpoint: { max: 5000, min: 800 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 800, min: 500 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 500, min: 0 },
          items: 1
        }
    };

    if (events.length === 0) { return <></> }

    return <Carousel responsive={responsive} renderButtonGroupOutside={true}>
        {events.map(element => {
            return <CalendarEvent event={element}/>
        })}
    </Carousel>;
}
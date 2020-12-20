import React, { useState } from 'react';
import { Card, Divider } from 'antd';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// configs to be used in date objects to get back string formats
const TIME_OPTIONS = {'hour12':true, hour:'numeric', minute:'numeric'};
const DATE_OPTIONS = {weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'};
const SHORT_DATE_OPTIONS = {weekday: 'short', month: 'short', day: 'numeric'};


// Component that provides a card for the carousel. 
export const CalendarEvent = (event) => {

    let firstLine = "";
    let secondLine = "";

    // all day event
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
        // multi-day event
        } else {
            firstLine = startDate.toLocaleString('en-US', TIME_OPTIONS) + ' ' + startDate.toLocaleString('en-US', SHORT_DATE_OPTIONS);
            secondLine = '— ' + endDate.toLocaleString('en-US', TIME_OPTIONS) + ' ' + endDate.toLocaleString('en-US', SHORT_DATE_OPTIONS);
        }
    }
    // returns back a card with all information about the event. Sets content to innerhtml to load links.
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


// Component to pull data from google calendar and provide carousel of events.
export const Calendar = ({loaded, isSignedIn}) => {

    // state of the events loaded and variable to prevent unnecessary reloads
    const [events, setEvents] = useState([]);
    const [eventsLoaded, setEventsLoaded] = useState(false);

    // if user isnt signed in or api not ready, do not show calendar component
    if (!loaded || !isSignedIn) { return <></> }

    // api call function
    const listUpcomingEvents = async (maxResults)  => {
        // create dates that start and end on current day
        let start = new Date();
        start.setHours(0,0,0,0);
        let end = new Date();
        end.setHours(23,59,59,999);

        // api call on primary calendar limited to current day (max 10 events)
        window.gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': start.toISOString(),
            'timeMax': end.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then((response) => {
            setEvents(response.result.items);
        }).catch((e) => {
            console.log(e);
        });
    }
    // if not already loaded, load events with api call
    if (!eventsLoaded && loaded && window.gapi.auth2 != null) {
        if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
            setEventsLoaded(true);
            listUpcomingEvents();
        }
    }
    // breakpoints for num items
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

    // 0 item case
    if (events.length === 0) { return <></> }

    // return the carousel component.
    return <Carousel responsive={responsive} renderButtonGroupOutside={true}>
        {events.map(element => {
            return <CalendarEvent event={element}/>
        })}
    </Carousel>;
}
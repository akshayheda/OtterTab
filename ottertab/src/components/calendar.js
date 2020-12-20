import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const TIME_OPTIONS = {'hour12':true, hour:'numeric', minute:'numeric'};

export const CalendarEvent = (event) => {

    let startDate = new Date(event.event.start.dateTime);
    let endDate = new Date(event.event.end.dateTime);

    let firstLine = "";
    let secondLine = "";

    // The event starts and ends on the same day
    if (startDate.toDateString() === endDate.toDateString()) {
        firstLine = startDate.toLocaleString('en-US', TIME_OPTIONS) + endDate.toLocaleString('en-US', TIME_OPTIONS);
    }

    console.log(event);
    return <Card title={event.event.summary} style={{ margin: 0.5 + 'rem'}} size="small" >
        <p>{}</p>
        <p>{}</p>
        <p>{event.event.description}</p>
    </Card>

}

export const Calendar = (loaded) => {

    const [events, setEvents] = useState([]);
    const [eventsLoaded, setEventsLoaded] = useState(false);

    if (!loaded) { return <></> }

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
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 8
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    if (events.length === 0) { return <></> }

    return <Carousel responsive={responsive}>
        {events.map(element => {
            return <CalendarEvent event={element}/>
        })}
    </Carousel>;
}
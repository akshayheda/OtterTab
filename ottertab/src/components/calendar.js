import React from 'react';

export const Calendar = () => {
    const listUpcomingEvents = async (maxResults)  => {
        window.gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then((response) => {
            console.log(response.result.items);
        }).catch((e) => {
            console.log(e);
        });
   }
    return <button onClick={(e) => listUpcomingEvents(10)}>list</button>;

}
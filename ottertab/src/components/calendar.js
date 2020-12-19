import React from 'react';

export const Calendar = () => {
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
        }).catch((e) => {
            console.log(e);
        });
   }
    return <button onClick={(e) => listUpcomingEvents(10)}>list</button>;

}
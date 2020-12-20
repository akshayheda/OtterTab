# OtterTab

> *"You don't need another tab; you need an OtterTab!"*

As college students in 2020, we face two challenges every day: fulfilling our seemingly endless responsibilities and taking care of our mental health. We built OtterTab to do both.

OtterTab is a landing page for Chrome and Firefox. It provides quick and easy insight into your daily schedule in the form of your calendar and notepad. OtterTab also supports a mood tracker, where you can record your mood once a day. This is a proven [positive psychology technique](https://serenitymentalhealthcenters.com/3-reasons-to-track-your-mood/) for improving mental health.

---

## User Guide

Using OtterTab is as simple as clicking a [link](https://ottertest2.wm.r.appspot.com/)! However, in order to access most of the features, you will need to sign in with your Google account. Click the Sign In button in the top right corner, and enter your credentials. We recommend setting OtterTab as your landing page for convenience.

![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled.png)

Voila! You're in!

![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%201.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%201.png)

The search bar is dead center, and the notes menu and mood tracker can be found in the side menu:

![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%202.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%202.png)

## Features List

Here's a brief rundown of the list of features in OtterTab:

- Clock

    The displayed time is synchronized to your browser time.

![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%203.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%203.png)

- Search Bar

    Type in a URL or use Google Search (just like Google Chrome!).

![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%204.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%204.png)

- Upcoming Events

    A list of your upcoming events are pulled from the account's google calendars. The events are displayed chronologically with clickable links like Zoom meetings if applicable. Clicking on the event redirects you to your Google Calendar event.

![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%205.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%205.png)

- Notes

    Write down notes and to-do items. These are synchronized to your Google account and will display upon login at any computer.

![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%206.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%206.png)

- Mood Tracker

    Record your mood once every day: positive, neutral, or negative.

    ![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%207.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%207.png)

    Your mood for each day is tabulated in a database displayed in a calendar so you can view your weekly and monthly trends.

    ![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%208.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%208.png)

## Architecture

![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%209.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%209.png)

![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%2010.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%2010.png)

![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%2011.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%2011.png)

![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%2012.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/Untitled%2012.png)

OtterTab is written in React and hosted on GCP App Engine.

The backend consists of a Firebase server to store notes and mood history for each user. The Upcoming Events tracker uses the Google Calendar API to synchronize your events.  

```
├── users
│   ├── user1
│		│		├── mood
│		│		│		├── 12-18-2020
│		│		│		│		├── positive
│		│		│		├── 12-19-2020
│		│		│		│		├── positive
│		│		│		├── 12-20-2020
│		│		│		│		├── neutral
│		│		├── notes
│		│		│		├── note1id
│		│		│		│		├── title
│		│		│		│		├── body
│		│		│		├── note2id
│		│		│		│		├── title
│		│		│		│		├── body
│		│		│		├── note3id
│		│		│		│		├── title
│		│		│		│		├── body
│   ├── user2
│		│		├── mood
│		│		│		├── 12-19-2020
│		│		│		│		├── neutral
│		│		│		├── 12-20-2020
│		│		│		│		├── negative
│		│		├── notes
│		│		│		├── note1id
│		│		│		│		├── title
│		│		│		│		├── body
│		│		│		├── note2id
│		│		│		│		├── title
│		│		│		│		├── body
```

## Documentation

**Components**

*App:* Top-level component to orchestrate all other components. Keeps track of user signed in state and does layout.

*Calendar:* Makes calls to Google Calendar API and renders returned data into carousel.

*MoodCalendar:* Calendar view to see historical moods. Queries against stored data and adds colored styles to dates.

*MoodDisplayer:* Modal that pops out the mood calendar.

*Auth:* Does the heavy lifting for initializing Google's api. Provides sign in/sign out and keeps track of user signed in state

*Notes:* Orchestrator component for notes. Provides the button and pop out sidebar for notes.

*NotesList:* Creates the list of past notes. Pulls from Firebase and renders notes in chronological order.

*AddNote:* Input group for adding in new notes. Takes in title and body, and updates Firebase Firestore with new notes.

*Search:* Primary search bar in center of screen. Makes distinction between urls and search queries and redirects accordingly. 

*Clock/Day:* Local time based clock and date.

*Center*: Component to encapsulate center part of screen. Holds clock, day, calendar, and search.

App Structure: 

```jsx
// App (src/App.js)

return <Layout className="App" style = {{height: 100 + 'vh'}}>
      <div style={{position: 'absolute', top: 0, right: 0, margin: 1 + 'rem'}}>
        <Auth justify='start' setLoaded={setLoaded} setIsSignedIn={setIsSignedIn}/>
      </div>
      <div style={{zIndex: 10, position: 'absolute', top: 0, left: 0, margin: 1 + 'rem'}}>
        <Row style={{marginBottom: 0.6 + 'rem'}}>
          <Brand/>
        </Row>
        <Row>
          <Notes isSignedIn={signedIn} loaded={gapiLoaded}/>
        </Row>
        <Row>
            <MoodDisplayer isSignedIn={signedIn} loaded={gapiLoaded}/>
        </Row>
      </div>
      <Content>
        <Center loaded={gapiLoaded} isSignedIn={signedIn}/>
      </Content>
      <Footer style = {{ backgroundColor: 'rgba(255, 255, 255, 0.0)', position: 'absolute', bottom: 0, width: 100 + '%' }}>
        <MoodTracker isSignedIn={signedIn} loaded={gapiLoaded}/>
      </Footer>
    </Layout>
```

## Appendix:

Mockup of Intended Design (done with photoshop during early stages of development):

![OtterTab%205c8d5291db4e4c219560fabf6aa8c626/OtterTab.png](OtterTab%205c8d5291db4e4c219560fabf6aa8c626/OtterTab.png)

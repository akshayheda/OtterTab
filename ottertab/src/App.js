import './App.less';
import { Center } from './components/core.js';
import { Auth } from './components/auth.js';
import { Layout, Row } from 'antd';
import React, { useState } from 'react';
import { Brand } from './components/brand.js';
import { Notes } from './components/notes.js';
import { MoodTracker } from './components/moodtracker.js';
import { MoodDisplayer } from './components/moodDisplayer.js';

const { Footer, Content } = Layout;

function App() {
  // globally store whether user is signed in and google api object is loaded.
  const [gapiLoaded, setLoaded] = useState(false);
  const [signedIn, setIsSignedIn] = useState(false);

  // structure all components using layouts and grid. 
  // Pass state setters into auth, and state variables into api linked components so that they update on change.
  return (
    <Layout className="App" style = {{height: 100 + 'vh'}}>
      <div style={{position: 'absolute', top: 0, right: 0, margin: 1 + 'rem'}}>
        <Auth justify='start' setLoaded={setLoaded} setIsSignedIn={setIsSignedIn}/>
      </div>
      <div style={{zIndex: 10, position: 'absolute', top: 0, left: 0, margin: 1 + 'rem'}}>
        <Row style={{marginBottom: 0.6 + 'rem'}}>
          <Brand/>
        </Row>
        <Row style={{marginBottom: 0.6 + 'rem'}}>
          <Notes isSignedIn={signedIn} loaded={gapiLoaded}/>
        </Row>
        <Row style={{marginBottom: 0.6 + 'rem'}}>
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
  );
}

export default App;

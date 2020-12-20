import './App.less';
import { Center } from './components/core.js';
import { Auth } from './components/auth.js';
import { Layout, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import { Brand } from './components/brand.js';
import { Notes } from './components/notes.js';
import { MoodTracker } from './components/moodtracker.js';
import { MoodDisplayer } from './components/moodDisplayer.js';

const { Header, Footer, Sider, Content } = Layout;

function App() {

  const [gapiLoaded, setLoaded] = useState(false);
  const [signedIn, setIsSignedIn] = useState(false);
  console.log(gapiLoaded, signedIn);

  return (
    <Layout className="App" style = {{height: 100 + 'vh'}}>
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
  );
}

export default App;

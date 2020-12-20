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

  return (
<<<<<<< HEAD
    <div className="App">
        <Header></Header>
        <Content style = {{ height: 100 + '%' }}>
          <Notes/>
          <Center/>
          <Calendar loaded={gapiLoaded}/>
          <MoodTracker/>
          <MoodDisplayer/>
        </Content>
        <Footer style = {{ position: 'absolute', bottom: 0, width: 100 + '%' }}>
          <div style={{float: 'left'}}>
            <Auth justify='start' setLoaded={status => setLoaded(status)}/>
          </div>
        </Footer>
    </div>
=======
    <Layout className="App" style = {{height: 100 + 'vh'}}>
      <div style={{position: 'absolute', top: 0, right: 0, margin: 1 + 'rem'}}>
        <Auth justify='start' setLoaded={status => setLoaded(status)}/>
      </div>
      <div style={{position: 'absolute', top: 0, left: 0, margin: 1 + 'rem'}}>
        <Row style={{marginBottom: 0.6 + 'rem'}}>
          <Brand/>
        </Row>
        <Row>
          <Notes/>
        </Row>
      </div>
      <Content>
        <Center loaded={gapiLoaded}/>
      </Content>
      <Footer style = {{ backgroundColor: 'rgba(255, 255, 255, 0.0)', position: 'absolute', bottom: 0, width: 100 + '%' }}>
      </Footer>
    </Layout>
>>>>>>> 43f9a288875ba6817974a75a3d8051c5f20889ca
  );
}

export default App;

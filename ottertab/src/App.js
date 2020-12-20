import './App.less';
import { Center } from './components/core.js';
import { Auth } from './components/auth.js';
import { Layout, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import { Notes } from './components/notes.js';

const { Header, Footer, Sider, Content } = Layout;

function App() {

  const [gapiLoaded, setLoaded] = useState(false);

  return (
    <Layout className="App" style = {{height: 100 + 'vh'}}>
      <div style={{position: 'absolute', top: 0, right: 0, margin: 1 + 'rem'}}>
        <Auth justify='start' setLoaded={status => setLoaded(status)}/>
      </div>
      <Notes/>
      <Content>
        <Center loaded={gapiLoaded}/>
      </Content>
      <Footer style = {{ backgroundColor: 'rgba(255, 255, 255, 0.0)', position: 'absolute', bottom: 0, width: 100 + '%' }}>
      </Footer>
    </Layout>
  );
}

export default App;

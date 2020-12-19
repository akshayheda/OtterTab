import './App.css';
import { Center } from './components/core.js';
import { Auth } from './components/auth.js';
import { Calendar } from './components/calendar.js';
import { Layout, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';

const { Header, Footer, Sider, Content } = Layout;

function App() {

  const [gapiLoaded, setLoaded] = useState(false);

  return (
    <div className="App">
        <Header></Header>
        <Content style = {{ height: 100 + '%' }}>
          <Center/>
          <Calendar loaded={gapiLoaded}/>
        </Content>
        <Footer style = {{ position: 'absolute', bottom: 0, width: 100 + '%' }}>
          <div style={{float: 'left'}}>
            <Auth justify='start' setLoaded={status => setLoaded(status)}/>
          </div>
        </Footer>
    </div>
  );
}

export default App;

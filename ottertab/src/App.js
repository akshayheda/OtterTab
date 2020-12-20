import './App.less';
import { Center } from './components/core.js';
import { Auth } from './components/auth.js';
import { Layout, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';

const { Header, Footer, Sider, Content } = Layout;

function App() {

  const [gapiLoaded, setLoaded] = useState(false);

  return (
    <Layout className="App" style = {{height: 100 + 'vh'}}>
      <Content>
        <Center loaded={gapiLoaded}/>
      </Content>
      <Footer style = {{ backgroundColor: 'rgba(255, 255, 255, 0.0)', position: 'absolute', bottom: 0, width: 100 + '%' }}>
        <div style={{float: 'left'}}>
          <Auth justify='start' setLoaded={status => setLoaded(status)}/>
        </div>
      </Footer>
    </Layout>
  );
}

export default App;

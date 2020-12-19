import logo from './logo.svg';
import './App.css';
import { Center } from './components/core.js';
import { Auth } from './components/auth.js';
import { Calendar } from './components/calendar.js';
import { Layout, Row, Col } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
        <Header></Header>
        <Content style = {{ height: 100 + '%' }}>
          <Center/>
          <Calendar/>
        </Content>
        <Footer style = {{ position: 'absolute', bottom: 0, width: 100 + '%' }}>
          <div style={{float: 'left'}}>
            <Auth justify='start'/>
          </div>
        </Footer>
    </div>
  );
}

export default App;

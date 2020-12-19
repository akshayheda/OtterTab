import logo from './logo.svg';
import './App.css';
import { Center } from './components/core.js';
import { Auth } from './components/auth.js';
import { Calendar } from './components/calendar.js';


function App() {
  return (
    <div className="App">
        <Center/>
        <Auth/>
        <Calendar/>
    </div>
  );
}

export default App;

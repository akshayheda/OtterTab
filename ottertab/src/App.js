import logo from './logo.svg';
import './App.css';
import { Clock } from './components/clock.js';
import { Day } from './components/day.js';
import { SearchBar} from './components/search.js';

function App() {
  return (
    <div className="App">
        <Clock/>
        <Day/>
        <SearchBar/>
    </div>
  );
}

export default App;


import './App.css';
import MacField from './components/MacField';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Front from './components/Front';
import Group from './components/Group';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButtonGroup';
import Token from './components/Token';
import Logs from './components/Logs'

function App() {
  return (
    <section className = 'Sepio'>
    <div className="App">    
<BrowserRouter>
<Group/>
<Routes>
  <Route path = '/mapping' element = {<Front/>}/>
  <Route path = '/log' element = {<Logs/>}/>
  <Route path = '/' element = {<Token/>}/>
</Routes>

      
</BrowserRouter>
      {/* <h1>Sepio</h1>
      <Front/> */}
      
    </div>
    </section>
  );
}

export default App;


//dont expect





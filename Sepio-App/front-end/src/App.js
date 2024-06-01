import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import RootView from './components/RootView';
import LogsPage from './components/LogsPage'
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';           // Core CSS
import 'primeicons/primeicons.css';   

function App() {
  return (
    <Router>
      <section className = 'sepio'>
    <div className="App">
      <Routes>
        <Route path = '/' element = {<SignUp/>}/>
        <Route path = '/hello' element = {<RootView/>}/>   
        <Route path = '/logs' element = {<LogsPage/>}/>     
      </Routes>

    </div>
    </section>
    </Router>
  );
}

export default App;





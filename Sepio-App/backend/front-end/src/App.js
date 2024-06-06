import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import RootView from './components/RootView';
import LogsPage from './components/LogsPage'
import MAC from './components/MAC'
import Settings from './components/Settings';
import SearchHistory from './components/SearchHistory';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';           // Core CSS
import 'primeicons/primeicons.css';   
import '@coreui/coreui/dist/css/coreui.min.css'; // Import CoreUI CSS


function App() {
  return (
    <Router>
      <section className = 'sepio'>
    <div className="App">
      <Routes>
        <Route path = '/' element = {<SignUp/>}/>
        <Route path = '/querytool' element = {<RootView/>}/>   
        <Route path = '/querytool/logs' element = {<LogsPage/>}/>  
        <Route path = '/querytool/mac' element = {<MAC/>}/> 
        <Route path = '/querytool/searchhistory' element = {<SearchHistory/>}/>  
        <Route path = '/querytool/settings' element = {<Settings/>}/>
      </Routes>

    </div>
    </section>
    </Router>
  );
}

export default App;





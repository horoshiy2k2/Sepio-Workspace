
// import React, { useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { InputText } from 'primereact/inputtext';
// import { Avatar } from 'primereact/avatar';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';
// import {
//   CSidebar, CSidebarNav, CNavItem, CContainer
// } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { NavLink } from 'react-router-dom';
// import SepioLogo from './../image/Sepio_Logo.png';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import axios from 'axios';
// import { Message } from 'primereact/message';

// export default function Layout() {

//   const [serviceNowInstance, setServiceNowInstance] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const navigate = useNavigate();

//   const handleStartClick = () => {
//     navigate('/querytool');
//   };

//   const handleLogout = () => {
//     navigate('/');
//   };

//   const testConnection = async () => {
//     try {
//       const response = await axios.post('/check-connection', {
//         serviceNowInstance,
//         username,
//         password
//       });

//       if (response.data.success) {
//         setMessage(response.data.message);
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       setMessage('Connection failed. Please check your credentials and try again.');
//     }
//   };

//   const start = (
//     <img
//       alt='logo'
//       src={SepioLogo}
//       height='40'
//       className='mr-2'
//       onClick={handleStartClick}
//     />
//   );

//   const end = (
//     <div className='flex align-items-center gap-2'>
//       <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
//         <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//         Logout
//       </NavLink>
//       <Avatar icon='pi pi-user' size='large' shape='circle' />
//     </div>
//   );

//   return (
//     <div>
//       <Menubar start={start} end={end} />
//       <div style={{ display: 'flex' }}>
//         <CSidebar className='border-end custom-sidebar'>
//           <CSidebarNav>
//             <CContainer fluid>
//             </CContainer>
//             <CNavItem>
//               <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//             </CNavItem>
//             <CNavItem>
//               <NavLink to='/querytool/logs' className='nav-link'><RiDashboardLine className='nav-icon' /> Logs</NavLink>
//             </CNavItem>
//             <CNavItem>
//               <NavLink to='/querytool/searchhistory' className='nav-link'><RiDashboardLine className='nav-icon' /> Search History</NavLink>
//             </CNavItem>
//             <CNavItem>
//               <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
//             </CNavItem>
//           </CSidebarNav>
//         </CSidebar>
//         <div style={{ marginTop: '100px', marginLeft: '400px' }}>
//           <div>
//             <h3>ServiceNow Credentials</h3>
//             <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
//               <InputText
//                         type="text"
//                         placeholder="ServiceNow Instance"
//                         value={serviceNowInstance}
//                         onChange={(e) => setServiceNowInstance(e.target.value)}
//               />
//               <InputText
//                         type="text"
//                         placeholder="Username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//               />
//               <InputText
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>
//           <Button label="Test Connection" icon="pi pi-check" onClick={testConnection} style={{ backgroundColor: '#183462', borderColor: '#183462' }} />
          
//           <div>
//           {message && (
//             <Message text={message} style={{ marginTop: '20px' }} />
//           )}
//           </div>
          
//         </div>
//       </div>


//     </div>
//   );
// }



import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import {
  CSidebar, CSidebarNav, CNavItem, CContainer
} from '@coreui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import SepioLogo from './../image/Sepio_Logo.png';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';
import { Message } from 'primereact/message';


export default function Layout() {

  const [serviceNowInstance, setServiceNowInstance] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/querytool');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const testConnection = async () => {
    try {
      const response = await axios.post('/check-connection', {
        serviceNowInstance,
        username,
        password
      });

      if (response.data.success) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Connection failed. Please check your credentials and try again.');
    }
  };

  const start = (
    <img
      alt='logo'
      src={SepioLogo}
      height='40'
      className='mr-2'
      onClick={handleStartClick}
    />
  );

  const end = (
    <div className='flex align-items-center gap-2'>
      <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
        <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
        Logout
      </NavLink>
      <Avatar icon='pi pi-user' size='large' shape='circle' />
    </div>
  );

  return (
    <div>
      <Menubar start={start} end={end} />
      <div style={{ display: 'flex' }}>
        <CSidebar className='border-end custom-sidebar'>
          <CSidebarNav>
            <CContainer fluid>
            </CContainer>
            <CNavItem>
              <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
            </CNavItem>
            {/* <CNavItem>
              <NavLink to='/querytool/logs' className='nav-link'><RiDashboardLine className='nav-icon' /> Logs</NavLink>
            </CNavItem>
            <CNavItem>
              <NavLink to='/querytool/searchhistory' className='nav-link'><RiDashboardLine className='nav-icon' /> Search History</NavLink>
            </CNavItem> */}
            <CNavItem>
              <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
            </CNavItem>
          </CSidebarNav>
        </CSidebar>
        <div style={{ marginTop: '100px', marginLeft: '300px', position: 'relative', width: '40%' }}>
          <div>
            <h3>ServiceNow Credentials</h3>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              <InputText
                        type="text"
                        placeholder="ServiceNow Instance"
                        value={serviceNowInstance}
                        onChange={(e) => setServiceNowInstance(e.target.value)}
              />
              <InputText
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
              />
              <InputText
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button label="Test Connection" icon="pi pi-check" onClick={testConnection} style={{ backgroundColor: '#183462', borderColor: '#183462' }} />
          
          {message && (
            <div style = {{marginTop: '50px'}}>
              <Message text={message} />
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}























//   return (
//     <div>
//       <h1>ServiceNow Connection Checker</h1>
//       <input
//         type="text"
//         placeholder="ServiceNow Instance"
//         value={serviceNowInstance}
//         onChange={(e) => setServiceNowInstance(e.target.value)}
//       />
//       <br />
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <br />
//       <button onClick={testConnection}>Test Connection</button>
//       <br />
//       <p>{message}</p>
//     </div>
//   );
// }

// export default App;
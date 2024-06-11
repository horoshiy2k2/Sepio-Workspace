
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




import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { Toast } from 'primereact/toast';

export default function Layout() {

  const [serviceNowInstance, setServiceNowInstance] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [sepioEndpoint, setSepioEndpoint] = useState('');
  const [sepioUsername, setSepioUsername] = useState('');
  const [sepioPassword, setSepioPassword] = useState('');
  const [sepioMessage, setSepioMessage] = useState('');
  const toast = React.useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Функція для отримання даних з сервера
  const fetchData = async () => {
    try {
      const snResponse = await axios.get('/get-source');
      setServiceNowInstance(snResponse.data.serviceNowInstance);
      setUsername(snResponse.data.username);
      setPassword(snResponse.data.password);

      const sepioResponse = await axios.get('/get-sepio-source');
      setSepioEndpoint(sepioResponse.data.sepioEndpoint);
      setSepioUsername(sepioResponse.data.sepioUsername);
      setSepioPassword(sepioResponse.data.sepioPassword)

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showError = (message) => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
  };

  const showSuccess = (message) => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
};

  // Виконання fetchData при зміні маршруту
  useEffect(() => {
    fetchData();
  }, [location]);

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
        showSuccess(response.data.message);
      } else {
        showSuccess(response.data.message);
      }
    } catch (error) {
      showError('Connection failed. Please check your credentials and try again.');
    }
  };

  const testSepioConnection = async () => {
    try {
      const response = await axios.post('/check-sepio-connection', {
        sepioEndpoint,
        sepioUsername,
        sepioPassword
      });

      if (response.data.success) {
        showSuccess(response.data.message);
      } else {
        showSuccess(response.data.message);
      }
    } catch (error) {
      showError('Connection failed. Please check your credentials and try again.');
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Toast ref={toast} />
      <Menubar start={start} end={end} />

      <div style={{ display: 'flex', flex: '1' }}>
        <CSidebar className='border-end custom-sidebar'>
          <CSidebarNav>
            <CContainer fluid>
            </CContainer>
            <CNavItem>
              <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
            </CNavItem>
            <CNavItem>
              <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
            </CNavItem>
          </CSidebarNav>
        </CSidebar>

        <div style={{ flex: '1', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '70%', maxWidth: '600px', minWidth: '300px', padding: '20px', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
            <div style={{ marginBottom: '20px' }}>
              {message && (
                <div style={{ marginBottom: '20px' }}>
                  <Message text={message} />
                </div>
              )}
              {sepioMessage && (
                <div style={{ marginBottom: '20px' }}>
                  <Message text={sepioMessage} />
                </div>
              )}
            </div>
            <h3>ServiceNow Credentials</h3>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              <InputText
                type="text"
                placeholder="ServiceNow Instance"
                value={serviceNowInstance}
                onChange={(e) => setServiceNowInstance(e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
              />
              <InputText
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
              />
              <InputText
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
              />
            </div>
            <Button label="Test Connection" icon="pi pi-check" onClick={testConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', marginBottom: '20px', width: '35%' }} />

            <div style={{ marginTop: '20px' }}></div>
            <h3>Sepio Credentials</h3>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              <InputText
                type="text"
                placeholder="Sepio Endpoint"
                value={sepioEndpoint}
                onChange={(e) => setSepioEndpoint(e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
              />
              <InputText
                type="text"
                placeholder="Username"
                value={sepioUsername}
                onChange={(e) => setSepioUsername(e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
              />
              <InputText
                type="password"
                placeholder="Password"
                value={sepioPassword}
                onChange={(e) => setSepioPassword(e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
              />
            </div>
            <Button label="Test Connection" icon="pi pi-check" onClick={testSepioConnection} style={{ backgroundColor: '#183462', borderColor: '#183462', width: '35%' }} />
          </div>
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
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

export default function Layout() {
  const [servicenowAddress, setServicenowAddress] = useState('');
  const [servicenowLogin, setServicenowLogin] = useState('');
  const [servicenowPassword, setServicenowPassword] = useState('');
  const [sepioAddress, setSepioAddress] = useState('');
  const [sepioLogin, setSepioLogin] = useState('');
  const [sepioPassword, setSepioPassword] = useState('');
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/querytool');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleTestConnection = async () => {
    try {
        //const response = await axios.post('https://sepio-hac-1-ng.sepiocyber.com/prime/webui/Auth/LocalLogin', "{\n    \"username\": \"icloud\",\n    \"password\": \"Changecloud19\"\n}");
        //console.log('POST response:', response.data);
    } catch (error) {
        console.error('Error posting MAC address:', error);
    }
}

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
              {/* <CForm className='d-flex'>
                <CFormInput type='search' className='me-2' placeholder='Search' />
                <CButton type='submit' variant='outline' style={{ backgroundColor: '#183462', color: '#fff' }}>
                  Search
                </CButton>
              </CForm> */}
            </CContainer>
            <CNavItem>
              <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
            </CNavItem>
            <CNavItem>
              <NavLink to='/querytool/logs' className='nav-link'><RiDashboardLine className='nav-icon' /> Logs</NavLink>
            </CNavItem>
            <CNavItem>
              <NavLink to='/querytool/searchhistory' className='nav-link'><RiDashboardLine className='nav-icon' /> Search History</NavLink>
            </CNavItem>
            <CNavItem>
              <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
            </CNavItem>
          </CSidebarNav>
        </CSidebar>
        <div style={{ marginTop: '100px', marginLeft: '400px' }}>
          <div>
            <h3>ServiceNow Credentials</h3>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              <InputText
                value={servicenowAddress}
                onChange={(e) => setServicenowAddress(e.target.value)}
                placeholder="ServiceNow Address"
                style={{ width: '100%', maxWidth: '380px', marginBottom: '10px' }}
              />
              <InputText
                value={servicenowLogin}
                onChange={(e) => setServicenowLogin(e.target.value)}
                placeholder="ServiceNow User Login"
                style={{ width: '100%', maxWidth: '380px', marginBottom: '10px' }}
              />
              <InputText
                value={servicenowPassword}
                onChange={(e) => setServicenowPassword(e.target.value)}
                placeholder="ServiceNow User Password"
                style={{ width: '100%', maxWidth: '380px', marginBottom: '10px' }}
              />
            </div>
            <div>
              <h3>Sepio Credentials</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
              <InputText
                value={sepioAddress}
                onChange={(e) => setSepioAddress(e.target.value)}
                placeholder="Sepio Address"
                style={{ width: '100%', maxWidth: '380px', marginBottom: '10px' }}
              />
              <InputText
                value={sepioLogin}
                onChange={(e) => setSepioLogin(e.target.value)}
                placeholder="Sepio User Login"
                style={{ width: '100%', maxWidth: '380px', marginBottom: '10px' }}
              />
              <InputText
                value={sepioPassword}
                onChange={(e) => setSepioPassword(e.target.value)}
                placeholder="Sepio User Password"
                style={{ width: '100%', maxWidth: '380px', marginBottom: '10px' }}
              />
            </div>
          </div>
          <Button label="Test Connection" icon="pi pi-check" onClick={handleTestConnection} style={{ backgroundColor: '#183462', borderColor: '183462' }} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-800px', top: '4px', marginRight: '-300px' }}>
      </div>
      <div style={{ marginTop: '40px', marginRight: '-100px' }}>
        <h1>Settings:</h1>
      </div>
    </div>
  );
}

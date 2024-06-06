import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import {
  CSidebar, CSidebarNav, CNavItem, CContainer, CForm, CFormInput, CButton
} from '@coreui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

export default function Layout() {
  const [macAddress, setMacAddress] = useState('');
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/querytool');
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Image of menubar and styling
  const start = (
    <img
      alt='logo'
      src='https://cdn.discordapp.com/attachments/641741231566618640/1246537643588714526/photo_2024-06-01_21-54-16.jpg?ex=665cc025&is=665b6ea5&hm=e1712ea8c1aa7d97a002cdd194c99339e1db96bbb8cbdeab7cd85c30db818a3b&'
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

          <NavLink to = '/querytool/settings' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/> Settings </NavLink>
         </CNavItem>
        </CSidebarNav>
      </CSidebar>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-700px', top: '4px', marginRight: '-300px' }}>
        <img
          alt='logo'
          src='https://cdn.discordapp.com/attachments/1229493252567203851/1247814454834368552/image.png?ex=66616545&is=666013c5&hm=70a935054a20b096b0cb8e31ad9017a2779ac3335a9965f5f341ce4f0f7a5379&'
          height='40'
          className='mr-2'
        />
      </div>

    </div>
  );
}
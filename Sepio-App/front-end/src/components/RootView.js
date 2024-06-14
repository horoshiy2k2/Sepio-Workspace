import React, { useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
import { RiDashboardLine } from 'react-icons/ri';
import SepioLogo from './../image/Sepio_Logo.png';
import SepioMainLogo from './../image/QueryTool.png';

export default function Layout() {
    const navigate = useNavigate();
    const [logoHeight, setLogoHeight] = useState('60px');

    const handleLogout = () => {
        navigate('/');
    };

    const handleResize = () => {
        if (window.innerWidth <= 480) {
            setLogoHeight('20px');
        } else if (window.innerWidth <= 768) {
            setLogoHeight('20px');
        } else {
            setLogoHeight('40px');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Call it initially to set the correct size

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const start = <img alt='logo' src={SepioLogo} height='40' className='mr-2' />;
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
            <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
                <CSidebarNav>
                    <CContainer fluid>
                        <CForm className='d-flex'>
                        </CForm>
                    </CContainer>
                    <CNavItem>
                        <NavLink to='/querytool/mac' className='nav-link'>
                            <RiDashboardLine className='nav-icon' />MAC
                        </NavLink>
                    </CNavItem>
                    <CNavItem>
                        <NavLink to='/querytool/settings' className='nav-link'>
                            <RiDashboardLine className='nav-icon' /> Settings
                        </NavLink>
                    </CNavItem>
                </CSidebarNav>
            </CSidebar>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '-600px',
                top: '4px',
                marginRight: '-150px'
            }}>
                <img src={SepioMainLogo} style={{
                    height: logoHeight,
                    transition: 'height 0.3s ease'
                }} className='mr-2' />
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { NavLink } from 'react-router-dom';
import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { Avatar } from 'primereact/avatar';
import axios from 'axios';
import SepioLogo from './../image/Sepio_Logo.png';
import MacSearch from './../image/Mac_Search.png';

export default function Layout() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [tables, setTables] = useState([]);

    const handleLogout = () => {
        navigate('/');
    }

    const handleStartClick = () => {
        navigate('/querytool');
    };

    const handlePostMac = async () => {
        try {
            const response = await axios.post('/api/check-mac', { macAddress: searchQuery });
            setResponseMessage(response.data.message);
            if (response.data.tables) {
                setTables(response.data.tables);
            } else {
                setTables([]);
            }
        } catch (error) {
            console.error('Error posting MAC address:', error);
            setResponseMessage('Error occurred while checking MAC address.');
            setTables([]);
        }
    }

    const start = (
        <>
            <img alt='logo' src={SepioLogo} height='40' className='mr-2' onClick={handleStartClick} />
        </>
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
                        <CForm className='d-flex'>
                            {/*Place for additional form elements after demo*/}
                        </CForm>
                    </CContainer>
                    <CNavItem>
                        <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
                    </CNavItem>
                    <CNavItem>
                        <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon'/> Settings </NavLink>
                    </CNavItem>
                </CSidebarNav>
            </CSidebar>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px' }}>
                <InputText
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search MAC"
                    style={{ width: `${(searchQuery.length < 45 ? 45 : searchQuery.length) * 8 + 20}px`, minWidth: '600px' }} // Adjusting width dynamically
                />
                <Button label='Search' icon='pi pi-search' onClick={handlePostMac} style={{ backgroundColor: '#183462', borderColor: '183462', marginLeft: '-10px' }} />
            </div>
            {responseMessage && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: responseMessage.includes('not found') ? 'red' : 'green' }}>
                    {responseMessage}
                    {tables.length > 0 && (
                        <div style={{ marginTop: '20px' }}>
                            <h4>Tables:</h4>
                            <ul>
                                {tables.map((table, index) => (
                                    <li key={index}>{table}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            {/* Remaining JSX code */}
        </div>
    );
}

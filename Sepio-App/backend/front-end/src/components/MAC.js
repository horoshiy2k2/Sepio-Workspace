





// import React, { useState, useEffect } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import {CSidebar, CSidebarNav, CNavTitle, CNavItem, CNGroup, CBadge, CSidebarToggler, CContainer, CForm, CFormInput, CButton} from '@coreui/react';
// import {RiDashboardLine, RiMenu2Line, RiDowloadCloud2Line, RiArrowDownSLine} from 'react-icons/ri';
// import {Avatar} from 'primereact/avatar';
// import axios from 'axios'; // Import axios for making API requests

// export default function Layout() {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [macAddresses, setMacAddresses] = useState([]);
//     const [filteredMacAddresses, setFilteredMacAddresses] = useState([]);

//     useEffect(() => {
//         async function fetchMacAddresses() {
//             try {
//                 const response = await axios.get('/api/mac-addresses'); // Assuming your server is running on the same domain
//                 setMacAddresses(response.data);
//                 setFilteredMacAddresses(response.data);
//             } catch (error) {
//                 console.error('Error fetching MAC addresses:', error);
//             }
//         }
//         fetchMacAddresses();
//     }, []);

//     const handleLogout = () => {
//         navigate('/');
//     }

//     const handleSearch = () => {
//         const filtered = macAddresses.filter((mac) =>
//             mac.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setFilteredMacAddresses(filtered);
//     }

//     const start = (
//         <>
//             <img alt='logo' src='https://cdn.discordapp.com/attachments/641741231566618640/1246537643588714526/photo_2024-06-01_21-54-16.jpg?ex=665cc025&is=665b6ea5&hm=e1712ea8c1aa7d97a002cdd194c99339e1db96bbb8cbdeab7cd85c30db818a3b&' height='40' className='mr-2' />
//         </>
//     );

//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             {/* <Button icon='pi pi-sign-out' label='Logout' style={{ backgroundColor: '#183462', borderColor: '#183462', marginRight: '10px', borderRadius: '10px' }} onClick={handleLogout} /> */}
//             <Avatar icon = 'pi pi-user' size = 'large' shape = 'circle'/>
//         </div>
//     );

//     return (
//         <div>
//             <Menubar start={start} end={end} />
            
//             <CSidebar className = 'border-end custom-sidebar'>
//             <CSidebarNav>
//                 <CContainer fluid>
//                     <CForm className = 'd-flex'>
//                         {/* <CFormInput type = 'search' className = 'search-item me-2' placeholder = 'Search'/>
//                         <CButton type = 'submit' variant = 'outline' style = {{backgroundColor: '#183462', color: '#fff'}}>
//                             Search
//                         </CButton> */}
//                     </CForm>
//                 </CContainer>
//                 <CNavItem>
//                 <NavLink to = '/querytool/mac' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/> MAC</NavLink>
//                 </CNavItem>

//                 <CNavItem>
//                 <NavLink to = '/querytool/logs' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>Logs</NavLink>
//                 </CNavItem>
//                 <CNavItem>
//                     <NavLink to = '/querytool/searchhistory' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>SearchHistory</NavLink>
//                 </CNavItem>
//             </CSidebarNav>
//         </CSidebar>

//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px'}}>
//             <InputText value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search MAC" />
//             <Button icon='pi pi-search' onClick={handleSearch} style={{ marginLeft: '10px' }} />
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginRight: '-100px' }}>
//             <ul>
//                 {filteredMacAddresses.map((mac, index) => (
//                     <li key={index} style={{
//                         listStyle: 'none',
//                         padding: '10px',
//                         border: '1px solid #ccc',
//                         borderRadius: '5px',
//                         margin: '5px',
//                         backgroundColor: '#f0f0f0',
//                         display: 'flex',
//                         justifyContent: 'space-between'
//                     }}>
//                         <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{mac}</span>
//                         <span style={{ fontSize: '14px', color: '#666' }}>MAC Address</span>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//         </div>
//     );
// }



// import React, { useState, useEffect } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import {CSidebar, CSidebarNav, CNavTitle, CNavItem, CNGroup, CBadge, CSidebarToggler, CContainer, CForm, CFormInput, CButton} from '@coreui/react';
// import {RiDashboardLine, RiMenu2Line, RiDowloadCloud2Line, RiArrowDownSLine} from 'react-icons/ri';
// import {Avatar} from 'primereact/avatar';
// import axios from 'axios'; // Import axios for making API requests

// export default function Layout() {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [macAddresses, setMacAddresses] = useState([]);
//     const [filteredMacAddresses, setFilteredMacAddresses] = useState([]);

//     useEffect(() => {
//         async function fetchMacAddresses() {
//             try {
//                 const response = await axios.get('/api/mac-addresses'); // Assuming your server is running on the same domain
//                 setMacAddresses(response.data);
//                 setFilteredMacAddresses(response.data);
//             } catch (error) {
//                 console.error('Error fetching MAC addresses:', error);
//             }
//         }
//         fetchMacAddresses();
//     }, []);

//     useEffect(() => {
//         if (searchQuery === '') {
//             setFilteredMacAddresses(macAddresses);
//         } else {
//             const filtered = macAddresses.filter((mac) =>
//                 mac.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredMacAddresses(filtered);
//         }
//     }, [searchQuery]);

//     const handleLogout = () => {
//         navigate('/');
//     }

//     const handleSearch = () => {
//         const filtered = macAddresses.filter((mac) =>
//             mac.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setFilteredMacAddresses(filtered);
//     }

//     const start = (
//         <>
//             <img alt='logo' src='https://cdn.discordapp.com/attachments/641741231566618640/1246537643588714526/photo_2024-06-01_21-54-16.jpg?ex=665cc025&is=665b6ea5&hm=e1712ea8c1aa7d97a002cdd194c99339e1db96bbb8cbdeab7cd85c30db818a3b&' height='40' className='mr-2' />
//         </>
//     );

//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             {/* <Button icon='pi pi-sign-out' label='Logout' style={{ backgroundColor: '#183462', borderColor: '#183462', marginRight: '10px', borderRadius: '10px' }} onClick={handleLogout} /> */}
//             <Avatar icon = 'pi pi-user' size = 'large' shape = 'circle'/>
//         </div>
//     );

//     return (
//         <div>
//             <Menubar start={start} end={end} />
            
//             <CSidebar className = 'border-end custom-sidebar'>
//             <CSidebarNav>
//                 <CContainer fluid>
//                     <CForm className = 'd-flex'>
//                         {/* <CFormInput type = 'search' className = 'search-item me-2' placeholder = 'Search'/>
//                         <CButton type = 'submit' variant = 'outline' style = {{backgroundColor: '#183462', color: '#fff'}}>
//                             Search
//                         </CButton> */}
//                     </CForm>
//                 </CContainer>
//                 <CNavItem>
//                 <NavLink to = '/querytool/mac' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/> MAC</NavLink>
//                 </CNavItem>

//                 <CNavItem>
//                 <NavLink to = '/querytool/logs' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>Logs</NavLink>
//                 </CNavItem>
//                 <CNavItem>
//                     <NavLink to = '/querytool/searchhistory' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>SearchHistory</NavLink>
//                 </CNavItem>
//             </CSidebarNav>
//         </CSidebar>

//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px'}}>
//             <InputText value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search MAC" />
//             <Button icon='pi pi-search' onClick={handleSearch} style={{ marginLeft: '10px' }} />
//         </div>
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginRight: '-100px' }}>
//             {searchQuery === '' ? (
//                 <p>No search query entered.</p>
//             ) : (
//                 <ul>
//                     {filteredMacAddresses.map((mac, index) => (
//                         <li key={index} style={{
//                             listStyle: 'none',
//                             padding: '10px',
//                             border: '1px solid #ccc',
//                             borderRadius: '5px',
//                             margin: '5px',
//                             backgroundColor: '#f0f0f0',
//                             display: 'flex',
//                             justifyContent: 'space-between'
//                         }}>
//                             <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{mac}</span>
//                             <span style={{ fontSize: '14px', color: '#666' }}>MAC Address</span>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//         </div>
//     );
// }





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

export default function Layout() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [macAddresses, setMacAddresses] = useState([]);
    const [filteredMacAddresses, setFilteredMacAddresses] = useState([]);

    useEffect(() => {
        async function fetchMacAddresses() {
            try {
                const response = await axios.get('/api/mac-addresses');
                setMacAddresses(response.data);
                setFilteredMacAddresses([]);
            } catch (error) {
                console.error('Error fetching MAC addresses:', error);
            }
        }
        fetchMacAddresses();
    }, []);

    const handleLogout = () => {
        navigate('/');
    }

    const handlePostMac = async () => {
        try {
            const response = await axios.post('/api/mac-addresses', { macAddress: searchQuery });
            console.log('POST response:', response.data);
            setMacAddresses(response.data);
            setFilteredMacAddresses(response.data);
        } catch (error) {
            console.error('Error posting MAC address:', error);
        }
    }

    // const handleSearch = () => {
    //     if (searchQuery === '') {
    //         setFilteredMacAddresses([]);
    //     } else {
    //         const filtered = macAddresses.filter((mac) =>
    //             mac.includes(searchQuery)
    //         );
    //         setFilteredMacAddresses(filtered);
    //     }
    // }

    const start = (
        <>
            <img alt='logo' src='https://cdn.discordapp.com/attachments/641741231566618640/1246537643588714526/photo_2024-06-01_21-54-16.jpg?ex=665cc025&is=665b6ea5&hm=e1712ea8c1aa7d97a002cdd194c99339e1db96bbb8cbdeab7cd85c30db818a3b&' height='40' className='mr-2' />
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
                        <NavLink to='/querytool/logs' className='nav-link'><RiDashboardLine className='nav-icon' /> Logs</NavLink>
                    </CNavItem>
                    <CNavItem>
                        <NavLink to='/querytool/searchhistory' className='nav-link'><RiDashboardLine className='nav-icon' /> SearchHistory</NavLink>
                    </CNavItem>
                </CSidebarNav>
            </CSidebar>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px' }}>
                <InputText
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search MAC"
                    style={{ width: `${(searchQuery.length < 45 ? 45 : searchQuery.length) * 8 + 20}px` }} // Adjusting width dynamically
                />
                <Button icon='pi pi-search' onClick={handlePostMac} style={{ marginLeft: '10px' }} />
            </div>
            {filteredMacAddresses.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginRight: '-100px' }}>
                    <ul>
                    {filteredMacAddresses.map((mac, index) => (
                            <li key={index} style={{
                                listStyle: 'none',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '5px',
                                margin: '5px',
                                backgroundColor: '#f0f0f0',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                textAlign: 'left' // Align text to the left
                            }}>
                                {typeof mac === 'string' ? (
                                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{mac}</span>
                                ) : (
                                    mac.map((item, subIndex) => (
                                        <span key={subIndex} style={{ fontSize: '14px', color: '#666' }}>{item}</span>
                                    ))
                                )}
                                <span style={{ fontSize: '14px', color: '#666' }}></span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}


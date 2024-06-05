

//my current vertion
// import React, { useState, useEffect } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { Avatar } from 'primereact/avatar';
// import axios from 'axios';

// export default function Layout() {
//     const navigate = useNavigate();
//     //current state searchQuery
//     const [searchQuery, setSearchQuery] = useState('');
//     //hold list of mac address 
//     const [macAddresses, setMacAddresses] = useState([]);
//     //list mac which metch with current search 
//     const [filteredMacAddresses, setFilteredMacAddresses] = useState([]);

//     //fetch mac address
//     useEffect(() => {
//         async function fetchMacAddresses() {
//             try {
//                 const response = await axios.get('/api/mac-addresses');
//                 //if succsesfule save resolt in setMacAddresses
//                 setMacAddresses(response.data);
//                 setFilteredMacAddresses([]);
//             } catch (error) {
//                 console.error('Error fetching MAC addresses:', error);
//             }
//         }
//         fetchMacAddresses();
//     }, []);
// // [] this use for ensures that runs only one 

//     const handleStartClick = () => {
//         navigate('/querytool');
//     }

//     const handleLogout = () => {
//         navigate('/');
//     }

//     const handleSearch = () => {
//         if (searchQuery === '') {
//             setFilteredMacAddresses([]);
//         } else {
//             const filtered = macAddresses.filter((mac) =>
//                 mac.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredMacAddresses(filtered);
//         }
//     }

//     const start = (
//         <>
//             <img alt='logo' src='https://cdn.discordapp.com/attachments/641741231566618640/1246537643588714526/photo_2024-06-01_21-54-16.jpg?ex=665cc025&is=665b6ea5&hm=e1712ea8c1aa7d97a002cdd194c99339e1db96bbb8cbdeab7cd85c30db818a3b&' height='40' className='mr-2' onClick = {handleStartClick} />
//         </>
//     );

//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Avatar icon='pi pi-user' size='large' shape='circle' />
//         </div>
//     );

//     return (
//         <div>
//             <Menubar start={start} end={end} />
            
//             <CSidebar className='border-end custom-sidebar'>
//                 <CSidebarNav>
//                     <CContainer fluid>
//                         <CForm className='d-flex'>
//                             {/* Additional form elements if needed */}
//                         </CForm>
//                     </CContainer>
//                     <CNavItem>
//                         <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/logs' className='nav-link'><RiDashboardLine className='nav-icon' /> Logs</NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/searchhistory' className='nav-link'><RiDashboardLine className='nav-icon' /> SearchHistory</NavLink>
//                     </CNavItem>
//                 </CSidebarNav>
//             </CSidebar>

//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-730px', top: '4px', marginRight: '-150px'}}>
//             <img alt = 'logo' src = 'https://cdn.discordapp.com/attachments/1229493252567203851/1247814153112911973/image.png?ex=666164fd&is=6660137d&hm=dfbf88b4bf1b4769f0e0218913c673144f8057d3329bf71fba0ba91f65798945&' height = '40' className = 'mr-2'/>
            
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', top: '4px', marginRight: '-150px' }}>
//                 <InputText value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search MAC" />
//                 <Button icon='pi pi-search' onClick={handleSearch} style={{ marginLeft: '-5px', backgroundColor: '#183462'}} />
//             </div>
//             {filteredMacAddresses.length > 0 && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginRight: '-100px' }}>
//                     <ul>
//                         {filteredMacAddresses.map((mac, index) => (
//                             <li key={index} style={{
//                                 listStyle: 'none',
//                                 padding: '10px',
//                                 border: '1px solid #ccc',
//                                 borderRadius: '5px',
//                                 margin: '5px',
//                                 backgroundColor: '#f0f0f0',
//                                 display: 'flex',
//                                 justifyContent: 'space-between'
//                             }}>
//                                 <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{mac}</span>
//                                 <span style={{ fontSize: '14px', color: '#666' }}>MAC Address</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}

//         </div>
//     );
// }













//V2 vertion
// import React, { useState, useEffect, useRef } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { Avatar } from 'primereact/avatar';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function Layout() {
//     const navigate = useNavigate();
//     const msgs = useRef(null); // Ref to hold the messages component reference
//     // Current state for search query
//     const [searchQuery, setSearchQuery] = useState('');
//     // State to hold list of MAC addresses 
//     const [macAddresses, setMacAddresses] = useState([]);
//     // State to hold list of MAC addresses which match the search query
//     const [filteredMacAddresses, setFilteredMacAddresses] = useState([]);
//     // State to manage error message visibility
//     const [errorMessageVisible, setErrorMessageVisible] = useState(false);

//     // Fetch MAC addresses
//     useEffect(() => {
//         async function fetchMacAddresses() {
//             try {
//                 const response = await axios.get('/api/mac-addresses');
//                 // If successful, save result in state
//                 setMacAddresses(response.data);
//             } catch (error) {
//                 console.error('Error fetching MAC addresses:', error);
//             }
//         }
//         fetchMacAddresses();
//     }, []);

//     // Search handler
//     const handleSearch = () => {
//         if (searchQuery === '') {
//             setFilteredMacAddresses([]); // Clear filteredMacAddresses if search query is empty
//             setErrorMessageVisible(false); // Hide error message
//             return;
//         }
        
//         const filtered = macAddresses.filter(mac =>
//             mac.toLowerCase().includes(searchQuery.toLowerCase())
//         );

//         // If no matches found, display error message
//         if (filtered.length === 0) {
//             setFilteredMacAddresses([]);
//             setErrorMessageVisible(true);
//             toast.error("MAC address not found");
//         } else {
//             setFilteredMacAddresses(filtered);
//             setErrorMessageVisible(false); // Hide error message if there are matches
//         }
//     };

//     const handleStartClick = () => {
//         navigate('/querytool');
//     };

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const start = (
//         <img
//             alt='logo'
//             src='https://cdn.discordapp.com/attachments/641741231566618640/1246537643588714526/photo_2024-06-01_21-54-16.jpg?ex=665cc025&is=665b6ea5&hm=e1712ea8c1aa7d97a002cdd194c99339e1db96bbb8cbdeab7cd85c30db818a3b&'
//             height='40'
//             className='mr-2'
//             onClick={handleStartClick}
//         />
//     );

//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <Avatar icon='pi pi-user' size='large' shape='circle' />
//         </div>
//     );

//     return (
//         <div>
//             <Menubar start={start} end={end} />

//             <CSidebar className='border-end custom-sidebar'>
//                 <CSidebarNav>
//                     <CContainer fluid>
//                         <CForm className='d-flex'>
//                             {/* Additional form elements if needed */}
//                         </CForm>
//                     </CContainer>
//                     <CNavItem>
//                         <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/logs' className='nav-link'><RiDashboardLine className='nav-icon' /> Logs</NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/searchhistory' className='nav-link'><RiDashboardLine className='nav-icon' /> SearchHistory</NavLink>
//                     </CNavItem>
//                 </CSidebarNav>
//             </CSidebar>

//                         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-700px', top: '4px', marginRight: '-150px'}}>
//              <img alt = 'logo' src = 'https://cdn.discordapp.com/attachments/1229493252567203851/1247814153112911973/image.png?ex=666164fd&is=6660137d&hm=dfbf88b4bf1b4769f0e0218913c673144f8057d3329bf71fba0ba91f65798945&' height = '40' className = 'mr-2'/>
            
//             </div>

//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginRight: '-120px' }}>
//                 <InputText value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search MAC" />
//                 <Button icon='pi pi-search' onClick={handleSearch} style={{ marginLeft: '-5px', backgroundColor: '#183462' }} />
//             </div>

//             <ToastContainer />

//             {filteredMacAddresses.length > 0 && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                     <ul>
//                         {filteredMacAddresses.map((mac, index) => (
//                             <li key={index} style={{
//                                 listStyle: 'none',
//                                 padding: '10px',
//                                 border: '1px solid #ccc',
//                                 borderRadius: '5px',
//                                 margin: '5px',
//                                 backgroundColor: '#f0f0f0',
//                                 display: 'flex',
//                                 justifyContent: 'space-between'
//                             }}>
//                                 <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{mac}</span>
//                                 <span style={{ fontSize: '14px', color: '#666' }}>MAC Address</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }








import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Menubar } from 'primereact/menubar';
import { NavLink } from 'react-router-dom';
import { Avatar } from 'primereact/avatar';
import { ToastContainer, toast } from 'react-toastify';
import { TextField, Button, IconButton, Typography, Container, Box, Card, CardContent, CardActions } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import 'react-toastify/dist/ReactToastify.css';
import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
import { RiDashboardLine } from 'react-icons/ri';



export default function Layout() {
    const navigate = useNavigate();
    const msgs = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [macAddresses, setMacAddresses] = useState([]);
    const [filteredMacAddresses, setFilteredMacAddresses] = useState([]);
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);

    useEffect(() => {
        async function fetchMacAddresses() {
            try {
                const response = await axios.get('/api/mac-addresses');
                setMacAddresses(response.data);
            } catch (error) {
                console.error('Error fetching MAC addresses:', error);
            }
        }
        fetchMacAddresses();
    }, []);

    const handleSearch = () => {
        if (searchQuery === '') {
            setFilteredMacAddresses([]);
            setErrorMessageVisible(false);
            return;
        }
        
        const filtered = macAddresses.filter(mac =>
            mac.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filtered.length === 0) {
            setFilteredMacAddresses([]);
            setErrorMessageVisible(true);
            toast.error("MAC address not found");
        } else {
            setFilteredMacAddresses(filtered);
            setErrorMessageVisible(false);

        }
    };

    const handleStartClick = () => {
        navigate('/querytool');
    };

    const handleLogout = () => {
        navigate('/');
    };

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
                         <CForm className='d-flex'>
                             {/* Additional form elements if needed */}
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



            <Container>
                <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-1400px', top: '4px', marginRight: '-150px'}}>
                    <img 
                        alt='logo' 
                        src='https://cdn.discordapp.com/attachments/1229493252567203851/1247814153112911973/image.png?ex=666164fd&is=6660137d&hm=dfbf88b4bf1b4769f0e0218913c673144f8057d3329bf71fba0ba91f65798945&'
                        height='40'
                    />
                    </div>
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-1300px', top: '4px', marginRight: '-150px'}}>
                    <TextField 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search MAC"
                        variant="outlined"
                        size="small"
                    />
                    
                    <IconButton color="primary" onClick={handleSearch}>
                        <SearchIcon />
                    </IconButton>
                    </div>
                </Box>

                <ToastContainer />
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '-620px', top: '4px', marginRight: '-150px'}}>
                {filteredMacAddresses.length > 0 && (
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={2}>
                        {filteredMacAddresses.map((mac, index) => (
                            <Card key={index} style={{ width: '300px', marginBottom: '10px' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {mac}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        MAC Address
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                   
                                </CardActions>
                            </Card>

                        ))}
                    </Box>
                )}
                </div>
                
            </Container>
            
        </div>
    );
}

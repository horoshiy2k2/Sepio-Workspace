
// //new
// import React, { useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { Avatar } from 'primereact/avatar';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import axios from 'axios';
// import SepioLogo from './../image/Sepio_Logo.png';

// export default function Layout() {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [responseMessage, setResponseMessage] = useState('');
//     const [foundMacAddresses, setFoundMacAddresses] = useState([]);

//     const handleLogout = () => {
//         navigate('/');
//     }

//     const handleStartClick = () => {
//         navigate('/querytool');
//     };

//     const handlePostMac = async () => {
//         try {

//             if (searchQuery.trim() === '') {
//                 setResponseMessage('Please enter at least one MAC address.');
//                 return;
//             }

//             const macAddresses = searchQuery.split(',').map(mac => mac.trim());

//             const responce = await axios.post('/api/check-mac', { macAddress: macAddresses });

//             console.log("post responce > " + responce.data.tables);

//             const newFoundMacAddresses = responce.data.map((response, index) => ({
//                 macAddress: macAddresses[index],
//                 macAddressStatus: response.macAddress,
//                 tables: response.tables || []
//             }));

//             setResponseMessage('Search completed');
//             setFoundMacAddresses(newFoundMacAddresses);
//         } catch (error) {
//             console.error('Error posting MAC address:', error);
//             setResponseMessage('Error occurred while checking MAC address.');
//             setFoundMacAddresses([]);
//         }
//     }

//     const start = (
//         <>
//             <img alt='logo' src={SepioLogo} height='40' className='mr-2' onClick={handleStartClick} />
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
//                             {/*Place for additional form elements after demo*/}
//                         </CForm>
//                     </CContainer>
//                     <CNavItem>
//                         <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
//                     </CNavItem>
//                 </CSidebarNav>
//             </CSidebar>

//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px' }}>
//                 <InputText
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search MAC"
//                     style={{ width: `${(searchQuery.length < 45 ? 45 : searchQuery.length) * 8 + 20}px`, minWidth: '600px' }} // Adjusting width dynamically
//                 />
//                 <Button label='Search' icon='pi pi-search' onClick={handlePostMac} style={{ backgroundColor: '#183462', borderColor: '183462', marginLeft: '0px' }} />
//             </div>
//             {responseMessage && (
//                 <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginLeft: '140px', color: responseMessage.includes('Please enter') ? 'red' : 'green' }}>
//                     {responseMessage}
//                 </div>
//             )}
//             {foundMacAddresses.length > 0 && (
//                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', width: '100%', marginLeft: '100px' }}>
//                     {foundMacAddresses.map((item, index) => (
//                         <div key={index} style={{ marginBottom: '20px', width: '90%', maxWidth: '900px' }}>
//                             <h4 style={{ textAlign: 'center' }}>{item.macAddress}</h4>
//                             <DataTable value={[item]} responsiveLayout="scroll" style={{ width: '100%', minWidth: '650px' }}>
//                                 <Column field="macAddressStatus" header="MAC Address Status" style={{ minWidth: '300px', width: '60%' }} />
//                                 <Column field="tables" header="Found In" body={(rowData) => rowData.tables.join(", ")} style={{ minWidth: '300px', width: '40%' }} />
//                             </DataTable>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }


















//new
import React, { useState, useRef, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { NavLink } from 'react-router-dom';
import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
import { RiDashboardLine } from 'react-icons/ri';
import { Avatar } from 'primereact/avatar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import SepioLogo from './../image/Sepio_Logo.png';
import { Toast } from 'primereact/toast';

export default function Layout() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [foundMacAddresses, setFoundMacAddresses] = useState([]);
    const [inputWidth, setInputWidth] = useState('300px'); // Initial width for the input field
    const toast = useRef(null);

    const handleLogout = () => {
        navigate('/');
    };

    const handleStartClick = () => {
        navigate('/querytool');
    };

    const showError = (message) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
    };

    const handlePostMac = async () => {
        try {

            if (searchQuery.trim() === '') {
                showError('Please enter at least one MAC address.');
                return;
            }

            if (searchQuery.split(",").indexOf("") >= 0) {
                showError('Please, remove extra comma(s) from your search bar!');
                return;
            }

            const showSuccess = (message) => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
            };

            const macAddresses = searchQuery.split(',').map(mac => mac.trim());

            const responce = await axios.post('/api/check-mac', { macAddress: macAddresses });

            if (responce.status === 400) {
                console.log("post responce from server > " + responce.data.message);
                showError(responce.data.message);
            } else {
                const newFoundMacAddresses = responce.data.map((response, index) => ({
                    macAddress: macAddresses[index],
                    macAddressStatus: response.macAddress,
                    tables: response.tables || []
                }));


                setFoundMacAddresses(newFoundMacAddresses);
                showSuccess('Search completed');
            }




        } catch (error) {
            console.error('Error posting MAC address:', error);
            showError('Error occurred while checking MAC address.');
            setFoundMacAddresses([]);
        }
    }

    // Function to handle resizing and adjust input width
    const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 280) {
            setInputWidth('-10px'); // Adjust width for smaller screens
        } else if (windowWidth <= 868) {
            setInputWidth('10px'); // Adjust width for medium screens
        } else {
            setInputWidth('400px'); // Default width for larger screens
        }
    };

    // Effect to add and remove resize event listener
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to set input width based on window size

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
            <Toast ref={toast} />
            <Menubar start={start} end={end} />
            <CSidebar className='border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
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
                        <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
                    </CNavItem>
                </CSidebarNav>
            </CSidebar>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px' }}>
                <InputText
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search MAC"
                    style={{
                        width: inputWidth,
                        minWidth: '200px', // Minimum width to prevent very narrow inputs
                        maxWidth: '600px', // Maximum width to limit overly wide inputs
                        transition: 'width 0.3s ease'
                    }}
                />
                <Button
                    label='Search'
                    icon='pi pi-search'
                    onClick={handlePostMac}
                    style={{ backgroundColor: '#183462', borderColor: '183462', marginLeft: '10px' }}
                />
            </div>

            {responseMessage && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', color: responseMessage.includes('Please enter') ? 'red' : 'green' }}>
                    {responseMessage}
                </div>
            )}

            {foundMacAddresses.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', width: '100%', marginLeft: '100px' }}>
                    {foundMacAddresses.map((item, index) => (
                        <div key={index} style={{ marginBottom: '20px', width: '90%', maxWidth: '600px' }}>
                            <h4 style={{ textAlign: 'center' }}>{item.macAddress}</h4>
                            <DataTable value={[item]} responsiveLayout="scroll" style={{ width: '100%', minWidth: '400px'}}>
                                <Column field="macAddressStatus" header="MAC Address Status" style={{ minWidth: '300px', width: '60%' }} />
                                <Column field="tables" header="Found In" body={(rowData) => rowData.tables.join(", ")} style={{ minWidth: '300px', width: '40%' }} />
                            </DataTable>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}























// import React, { useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Button } from 'primereact/button';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { NavLink } from 'react-router-dom';
// import { CSidebar, CSidebarNav, CNavItem, CContainer, CForm } from '@coreui/react';
// import { RiDashboardLine } from 'react-icons/ri';
// import { Avatar } from 'primereact/avatar';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Toast } from 'primereact/toast';
// import axios from 'axios';
// import SepioLogo from './../image/Sepio_Logo.png';

// export default function Layout() {
//     const navigate = useNavigate();
//     const [searchQuery, setSearchQuery] = useState('');
//     const [responseMessage, setResponseMessage] = useState('');
//     const [foundMacAddresses, setFoundMacAddresses] = useState([]);
//     const toast = React.useRef(null);

//     const handleLogout = () => {
//         navigate('/');
//     };

//     const handleStartClick = () => {
//         navigate('/querytool');
//     };

//     const showError = (message) => {
//         toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 3000 });
//     };

//     const showSuccess = (message) => {
//         toast.current.show({ severity: 'success', summary: 'Success', detail: message, life: 3000 });
//     };

//     const handlePostMac = async () => {
//         try {
//             if (searchQuery.trim() === '') {
//                 setResponseMessage('Please enter at least one MAC address.');
//                 showError('Please enter at least one MAC address.');
//                 return;
//             }

//             const macAddresses = searchQuery.split(',').map(mac => mac.trim());

//             const responce = await axios.post('/api/check-mac', { macAddress: macAddresses });

//             console.log("post responce > " + responce.data.tables);

//             const newFoundMacAddresses = responce.data.map((response, index) => ({
//                 macAddress: macAddresses[index],
//                 macAddressStatus: response.macAddress,
//                 tables: response.tables || []
//             }));

//             setResponseMessage('Search completed');
//             setFoundMacAddresses(newFoundMacAddresses);
//             showSuccess('Search completed');
//         } catch (error) {
//             console.error('Error posting MAC address:', error);
//             setResponseMessage('Error occurred while checking MAC address.');
//             showError('Error occurred while checking MAC address.');
//             setFoundMacAddresses([]);
//         }
//     };

//     const start = (
//         <>
//             <img alt='logo' src={SepioLogo} height='40' className='mr-2' onClick={handleStartClick} />
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
//             <Toast ref={toast} />
//             <Menubar start={start} end={end} />

//             <CSidebar className='border-end custom-sidebar'>
//                 <CSidebarNav>
//                     <CContainer fluid>
//                         <CForm className='d-flex'>
//                             {/* Place for additional form elements after demo */}
//                         </CForm>
//                     </CContainer>
//                     <CNavItem>
//                         <NavLink to='/querytool/mac' className='nav-link'><RiDashboardLine className='nav-icon' /> MAC</NavLink>
//                     </CNavItem>
//                     <CNavItem>
//                         <NavLink to='/querytool/settings' className='nav-link'><RiDashboardLine className='nav-icon' /> Settings </NavLink>
//                     </CNavItem>
//                 </CSidebarNav>
//             </CSidebar>

//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
//                 <InputText
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search MAC"
//                     style={{ width: `${(searchQuery.length < 45 ? 45 : searchQuery.length) * 8 + 20}px`, minWidth: '600px' }} // Adjusting width dynamically
//                 />
//                 <Button label='Search' icon='pi pi-search' onClick={handlePostMac} style={{ backgroundColor: '#183462', borderColor: '183462', marginLeft: '10px' }} />
//             </div>
//             {foundMacAddresses.length > 0 && (
//                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', width: '100%' }}>
//                     {foundMacAddresses.map((item, index) => (
//                         <div key={index} style={{ marginBottom: '20px', width: '90%', maxWidth: '900px' }}>
//                             <h4 style={{ textAlign: 'center' }}>{item.macAddress}</h4>
//                             <DataTable value={[item]} responsiveLayout="scroll" style={{ width: '100%', minWidth: '650px' }}>
//                                 <Column field="macAddressStatus" header="MAC Address Status" style={{ minWidth: '300px', width: '60%' }} />
//                                 <Column field="tables" header="Found In" body={(rowData) => rowData.tables.join(", ")} style={{ minWidth: '300px', width: '40%' }} />
//                             </DataTable>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

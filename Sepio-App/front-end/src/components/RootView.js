//import all dependencys
import React from 'react';
import {Menubar} from 'primereact/menubar';
import {InputText} from 'primereact/badge';
import {Avatar} from 'primereact/avatar';
import {useNavigate} from 'react-router-dom';
import {Button} from 'primereact/button';
import {CSidebar, CSidebarNav, CNavTitle, CNavItem, CNGroup, CBadge, CSidebarToggler, CContainer, CForm, CFormInput, CButton} from '@coreui/react';
import {RiDashboardLine, RiMenu2Line, RiDowloadCloud2Line, RiArrowDownSLine} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import SepioLogo from './../image/Sepio_Logo.png'
import SepioMainLogo from './../image/QueryTool.png'


export default function Layout(){

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    }

    //image of menubar and stylind
    const start = <img alt = 'logo' src = {SepioLogo} height = '40' className = 'mr-2'/>
    const end = (
        <div className = 'flex align-items-center gap-2'>
            {/* styling for all components: style{} */}
            <NavLink to='/' className='p-button p-component p-button-text' style={{  borderRadius: '10px', padding: '10px' }}>
                <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
                Logout
            </NavLink>
            {/* <Button icon = 'pi pi-sign-out' label = 'Logout' style = {{backgroundColor: '#183462', borderColor: '#183462', marginRight: '10px', borderRadius: '10px'}} onClick = {handleLogout}/> */}
            <Avatar icon = 'pi pi-user' size = 'large' shape = 'circle'/>
        </div>
    );

return (
    <div>
        <Menubar start = {start} end = {end}/>
        <CSidebar className = 'border-end custom-sidebar' visible={true} style={{ height: '100vh', position: 'sticky', top: '0' }}>
            <CSidebarNav>
                <CContainer fluid>
                    <CForm className = 'd-flex'>                
                    </CForm>
                </CContainer>
                <CNavItem>
                <NavLink to = '/querytool/mac' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>MAC</NavLink>

                </CNavItem>
                
                {/* <CNavItem>
                <NavLink to = '/querytool/logs' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>Logs</NavLink>
                </CNavItem> */}
                {/* <CNavItem>
                    <NavLink to = '/querytool/searchhistory' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>SearchHistory</NavLink>
                </CNavItem> */}

                <CNavItem>

                    <NavLink to = '/querytool/settings' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/> Settings </NavLink>
                </CNavItem>
            </CSidebarNav>
        </CSidebar>
        <div  style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px'}}>
        <img src={SepioMainLogo} height='60' className='mr-2' />
        </div>
    </div>
);
}

// Import all dependencies
// import React, { useState } from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Avatar } from 'primereact/avatar';
// import { Popover } from 'primereact/popover';


// import { NavLink } from 'react-router-dom';
// import { RiDashboardLine } from 'react-icons/ri';
// import SepioLogo from './../image/Sepio_Logo.png';
// import SepioMainLogo from './../image/QueryTool.png';

// export default function Layout() {
//     const [popoverVisible, setPopoverVisible] = useState(false);

//     const user = {
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         // Add more user details as needed
//     };

//     const showPopover = (event) => {
//         setPopoverVisible(true);
//     };

//     const hidePopover = (event) => {
//         setPopoverVisible(false);
//     };

//     const popoverTemplate = (
//         <div className="user-popover">
//             <div>Name: {user.name}</div>
//             <div>Email: {user.email}</div>
//             {/* Add more user details here */}
//         </div>
//     );

//     const start = <img alt='logo' src={SepioLogo} height='40' className='mr-2' />;

//     const end = (
//         <div className='flex align-items-center gap-2'>
//             <NavLink to='/' className='p-button p-component p-button-text' style={{ borderRadius: '10px', padding: '10px' }}>
//                 <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
//                 Logout
//             </NavLink>
//             <div onMouseEnter={showPopover} onMouseLeave={hidePopover}>
//                 <Avatar icon='pi pi-user' size='large' shape='circle' />
//                 <Popover visible={popoverVisible} onHide={hidePopover} target={document.getElementsByClassName("p-avatar")[0]}>
//                     {popoverTemplate}
//                 </Popover>
//             </div>
//         </div>
//     );

//     return (
//         <div>
//             <Menubar start={start} end={end} />
//             {/* Your CSidebar and other content */}
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-600px', top: '4px', marginRight: '-150px' }}>
//                 <img src={SepioMainLogo} height='60' className='mr-2' />
//             </div>
//         </div>
//     );
// }

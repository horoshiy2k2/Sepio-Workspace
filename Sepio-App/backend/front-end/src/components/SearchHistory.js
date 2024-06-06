
import React, {useState} from 'react';
import {Menubar} from 'primereact/menubar';
import {InputText} from 'primereact/badge';
import {Avatar} from 'primereact/avatar';
import {useNavigate} from 'react-router-dom';
import {Button} from 'primereact/button';
import {CSidebar, CSidebarNav, CNavTitle, CNavItem, CNGroup, CBadge, CSidebarToggler, CContainer, CForm, CFormInput, CButton} from '@coreui/react';
import {RiDashboardLine, RiMenu2Line, RiDowloadCloud2Line, RiArrowDownSLine} from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import SepioLogo  from './../image/Sepio_Logo.png';
import SearchLogo  from './../image/Search_History.png';



export default function Layout(){

    const [macAddress, setMacAddress] = useState('');


    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('/querytool')
    }

    const handleLogout = () => {
        navigate('/');
    }

    //image of menubar and stylind
    const start = <img alt = 'logo' src = {SepioLogo} height = '40' className = 'mr-2' onClick={handleStartClick}/>
    const end = (
        <div className = 'flex align-items-center gap-2'>
             <NavLink to='/' className='p-button p-component p-button-text' style={{  borderRadius: '10px', padding: '10px' }}>
                <span className='pi pi-sign-out' style={{ marginRight: '5px' }} />
                Logout
            </NavLink>
            {/* styling for all components: style{} */}
            {/* <Button icon = 'pi pi-sign-out' label = 'Logout' style = {{backgroundColor: '#183462', borderColor: '#183462', marginRight: '10px', borderRadius: '10px'}} onClick = {handleLogout}/> */}
            <Avatar icon = 'pi pi-user' size = 'large' shape = 'circle'/>
        </div>
    );

return (
    <div>
        <Menubar start = {start} end = {end}/>
        <CSidebar className = 'border-end custom-sidebar'>
            <CSidebarNav>
                <CContainer fluid>
                    <CForm className = 'd-flex'>
                        {/* <CFormInput type = 'search' className = 'search-item me-2' placeholder = 'Search'/>
                        <CButton type = 'submit' variant = 'outline' style = {{backgroundColor: '#183462', color: '#fff'}}>
                            Search
                        </CButton> */}
                    </CForm>
                </CContainer>
                <CNavItem>
                <NavLink to = '/querytool/mac' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/> MAC</NavLink>
                </CNavItem>

                <CNavItem>
                <NavLink to = '/querytool/logs' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>Logs</NavLink>
                </CNavItem>
                <CNavItem>
                    <NavLink to = '/querytool/searchhistory' className = 'nav-link'><RiDashboardLine className = 'nav-icon'/>SearchHistory</NavLink>
                </CNavItem>
            </CSidebarNav>
		</CSidebar>
		
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-700px', top: '4px', marginRight: '-300px'}}>
            <img alt = 'logo' src = {SearchLogo} height = '40' className = 'mr-2'/>
            
           
            </div>
            <div className = 'content' style = {{padding: '20px', marginTop: '20px', maxWidth: '800px', margin: '0 auto', marginRight: '400px'}}>
                <CForm style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <div>
							<CFormInput
							placeholder = 'Enter MAC Address'
							value = {macAddress}
							onChange = {(e) => setMacAddress(e.target.value)}
							style = {{width: '100%' }}
							/>
                </div>
				<Button label='Search' icon='pi pi-search' style={{ backgroundColor: '#183462', borderColor: '183462', marginLeft:'20px' ,borderRadius:'7px'}}/>
                </CForm>
                <div className = 'results' style = {{marginTop: '30px'}}>

                </div>

			</div>
		


            {/* write logic for  react-history-search here:*/}
        
    </div>

);
}





//this comonent need:

//<div className="search-history-container"> {/* Wrap SearchHistory in a div */}
{/* <SearchHistory
  placeholder='Search MAC Address'
  onSearch={handleSearch}
  onChange={(value) => setMacAddress(value)}
  historyKey='macAddressSearchHistory'
  style={{ width: '100%' }}
/> */}
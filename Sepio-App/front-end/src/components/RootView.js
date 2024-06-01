
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import {Button} from 'primereact/button';

export default function RootView() {
    const navigate = useNavigate();


    const handleItemClick = (item) => {
        console.log('Item ', item.label);
       if (item.label === 'Logs') {
        navigate('/logs');
             // Redirect to '/logs' when 'Logs' is clicked
      }
    };

    const itemRenderer = (item) => (
        <a onClick={() => handleItemClick(item)} className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );


    

    const items = [
        {
            label: 'MAC',
            icon: 'pi pi-star',
            template: itemRenderer
        },
        {
            label: 'Logs',
            icon: 'pi pi-star',
            template: itemRenderer
        },
        {
            label: 'Search History',
            icon: 'pi pi-star',
            template: itemRenderer
           
        }
    ];

    const start = <img alt="logo" src="https://cdn.discordapp.com/attachments/641741231566618640/1246537643588714526/photo_2024-06-01_21-54-16.jpg?ex=665cc025&is=665b6ea5&hm=e1712ea8c1aa7d97a002cdd194c99339e1db96bbb8cbdeab7cd85c30db818a3b&" height="40" className="mr-2" />;
    const end = (
        <div className="flex align-items-center gap-2">

            <Button icon = 'pi pi-sign-out' label = 'Logout' style = {{backgroundColor: '#183462', borderColor: '#183462',  marginRight: '10px'}}></Button>
            {/* <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" /> */}
            <Avatar icon = "pi pi-user" size="large" shape="circle" />   
            {/* <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" /> */}
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    );
}




















// import React from 'react';
// import { Menubar } from 'primereact/menubar';
// import { Badge } from 'primereact/badge';
// import { Avatar } from 'primereact/avatar';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'primereact/button';

// export default function RootView() { // Ensure the name matches
//     const navigate = useNavigate();

//     const handleItemClick = (item) => {
//         console.log('Item clicked:', item.label); // Debug statement
//         if (item.label === 'Logs') {
//             navigate('/logs'); // Redirect to '/logs' when 'Logs' is clicked
//         }
//     };

//     const itemRenderer = (item) => (
//         <a onClick={() => handleItemClick(item)} className="flex align-items-center p-menuitem-link">
//             <span className={item.icon} />
//             <span className="mx-2">{item.label}</span>
//             {item.badge && <Badge className="ml-auto" value={item.badge} />}
//             {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
//         </a>
//     );

//     const items = [
//         {
//             label: 'MAC',
//             icon: 'pi pi-star',
//             template: itemRenderer // Ensure the template is used
//         },
//         {
//             label: 'Logs',
//             icon: 'pi pi-star',
//             template: itemRenderer // Ensure the template is used
//         },
//         {
//             label: 'Search History',
//             icon: 'pi pi-star',
//             template: itemRenderer // Ensure the template is used
//         }
//     ];

//     const start = <img alt="logo" src="https://sepiocyber.com/wp-content/uploads/2022/10/Sepio_Cyber-logo.svg" height="40" className="mr-2" />;
//     const end = (
//         <div className="flex align-items-center gap-2">
//             <Button icon='pi pi-sign-out' label='Logout' style={{ backgroundColor: '#183462', borderColor: '#183462', marginRight: '10px' }} />
//             <Avatar icon="pi pi-user" size="large" shape="circle" />   
//         </div>
//     );

//     return (
//         <div className="card">
//             <Menubar model={items} start={start} end={end} />
//         </div>       
//     );
// }




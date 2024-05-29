import React, {useState} from 'react';



const Macfield = () => {
    const [mac, setMac] = useState(''); 


    const data =() =>{
        console.warn(mac);
    }
    return(
        <div className = 'getmac'>
            <input className = 'inputBox' type = 'text' placeholder = 'MAC' 
            value = {mac} onChange = {(e) => setMac(e.target.value)}
            />
            <button onClick={data} className='appButton' type = 'button'> Find MAC </button>
        </div>
    )
}

export default Macfield;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const MacField = () => {
//   const [mac, setMac] = useState('');
//   const navigate = useNavigate();

//   const data = () => {
//     console.warn(mac);
//   };

//   return (
//     <div className='getmac'>
//       <input
//         className='inputBox'
//         type='text'
//         placeholder='MAC'
//         value={mac}
//         onChange={(e) => setMac(e.target.value)}
//       />
//     </div>
//   );
// }

// export default MacField;

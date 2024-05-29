
import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/material/IconButton';
import Setting from '@mui/icons-material/Settings';
import { FormLabel } from '@mui/material';
import {BrowserRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';


export default function Group (){//create fuction for return some value
    return(
//seting view for button 
 <ButtonGroup
variant = 'contained'
color = 'primary'
aria-lab = 'outlined primary button group'

//use implementation CSS insaide JS
sx = {{
'--ButtonGroup-separatorColor': 'none !important',
'& > span':{
zIndex: 3,
background:'linear-gradient(to top, transparent, rgba(255, 255, 255, / 0.6), tranparent',
},
}}
>
    <Link to = '/'><Button>Token</Button></Link>
    <Divider/>
    <Link to = 'mapping'><Button>Mapping</Button></Link>
    <Divider/>
   <Link to = '/log'><Button>Logs</Button></Link>
    <Divider/>
    <IconButton>
        <Setting/>
    </IconButton>
    </ButtonGroup>
    )
    }

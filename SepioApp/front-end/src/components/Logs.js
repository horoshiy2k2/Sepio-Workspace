import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';


export default function Log () {
    
    return(
<div className = 'form-logs'>
<Input
sx = {{'--Input-decoretorChildHeight': '45px',
width: '200%',
height: '300px',
fontSize: '20px'
    }}
    placeholder = 'Logs:'
    />
    </div>
    )
}

import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';
import SepioLogo from './../image/Sepio_Logo.png';
import axios from 'axios';

export default function InputSubscription({setUsername}) {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    text: '',
    status: 'initial',
  });

  const [password, setPassword] = React.useState('');

  const inputData = () => {
    console.log(data, password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.text === 'admin' && password === 'admin') {
      setData((current) => ({ ...current, status: 'loading' }));
      try {
        // Replace timeout with real backend operation
        setTimeout(() => {
			  setData({ text: '', status: 'sent' });
			  setUsername(data.text);
          navigate('/querytool');
        }, 1500);
      } catch (error) {
        setData((current) => ({ ...current, status: 'failure' }));
      }
    } else {
      setData((current) => ({ ...current, status: 'failure' }));
    }
    try {
      const response = await axios.post('/authenticate', {
        username: data.username,
        password: data.password
      });

      if (response.data.otpRequired) {
        setUsername(data.username);
        navigate('/2fa', { state: { qrCode: response.data.qrCode, username: data.username } });
      } else {
        setUsername(data.username);
        navigate('/querytool');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setData({ ...data, status: 'failure' });
    }
  };



  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#778899', padding: '40px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <img src={SepioLogo} alt="Welcome" style={{ marginBottom: '20px', height: 70 }} />
      <div className='form-token'>
        <form onSubmit={handleSubmit} id="demo">
          <FormControl>
             <FormLabel>User name</FormLabel>
            <Input
              placeholder="User name"
              type="text"
              required
              value={data.username}
              onChange={(event) => setData({ ...data, username: event.target.value, status: 'initial' })}
              error={data.status === 'failure'}
            />
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              type="password"
              required
              value={data.password}
              onChange={(event) => setData({ ...data, password: event.target.value, status: 'initial' })}
              error={data.status === 'failure'}
            />
            <Button variant="solid" color="primary" type="submit">
              Log in
            </Button>
            {data.status === 'failure' && (
              <FormHelperText>Error logging in. Please check your credentials.</FormHelperText>
            )}
          </FormControl>
        </form>
      </div>
    </div>
  );
}





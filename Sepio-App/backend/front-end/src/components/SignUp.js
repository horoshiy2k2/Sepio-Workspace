import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router-dom';

export default function InputSubscription() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    text: '',
    status: 'initial',
  });

  const [password, setPassword] = React.useState('');

  const inputData = () => {
    console.log(data, password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: 'loading' }));
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setData({ text: '', status: 'sent' });
        navigate('/querytool');
      }, 1500);
    } catch (error) {
      setData((current) => ({ ...current, status: 'failure' }));
    }
  };
//   https://sepiocyber.com/wp-content/uploads/2023/06/Sepio-logo-w.svg
//image
// #f0f0f0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#778899', padding: '40px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '100px' }}>
      <img src= "https://cdn.discordapp.com/attachments/641741231566618640/1246537643588714526/photo_2024-06-01_21-54-16.jpg?ex=665cc025&is=665b6ea5&hm=e1712ea8c1aa7d97a002cdd194c99339e1db96bbb8cbdeab7cd85c30db818a3b&" alt="Welcome" style={{ marginBottom: '20px', height: 70 }} />
      <div className='form-token'>
        <form onSubmit={handleSubmit} id="demo">
          <FormControl>
            <FormLabel
              sx={(theme) => ({
                '--FormLabel-color': theme.vars.palette.primary.plainColor,
              })}
            >
              User name
            </FormLabel>
            <Input
              sx={{ '--Input-decoratorChildHeight': '45px', marginBottom: '15px' }}
              placeholder="User name"
              type="text"
              required
              value={data.text} onChange={(event) => setData({ text: event.target.value, status: 'initial' })}
              error={data.status === 'failure'}
            />
            <FormLabel
              sx={(theme) => ({
                '--FormLabel-color': theme.vars.palette.primary.plainColor,
                marginTop: '5px'
              })}
            >
              Password
            </FormLabel>
            <Input
              sx={{ '--Input-decoratorChildHeight': '45px', marginBottom: '15px' }}
              placeholder="Password"
              type="password"
              required
              value={password} onChange={(event) => setPassword(event.target.value)}
              error={data.status === 'failure'}
            />
            <Button
              onClick={inputData}
              variant="solid"
              color="primary"
              loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5, marginTop: '20px' }}
            >
              Log in
            </Button>
            {data.status === 'failure' && (
              <FormHelperText
                sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
              >
                Oops! something went wrong, please try again later.
              </FormHelperText>
            )}
          </FormControl>
        </form>
      </div>
    </div>
  );
}
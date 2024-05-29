// import * as React from 'react';
// import FormControle from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import FormHelperText from '@mui/joy/FormHelperText';
// import Input from '@mui/joy/Input';
// import Button from '@mui/joy/Button';

// export default function InputSubscription(){

//         const[data, setData] = React.useState({
//             text: '',
//             status: 'initial',
//         });
//     const handlerSubmit = (event) => {
//         event.preventDefault();
//         setData((current) => ({...current,status: 'loading'}));
//         try{
//             setTimeout(() => {
//                 setData({text: '', status: 'send'});
//             }, 1500);
//         }catch(error) {
//             setData((current) => ({...current, status: 'failure'}));
//         }

//     };

//     return(
//         <form onSubmit = {handlerSubmit} id = 'demo'>
//             <FormControle>
//                 <FormLabel
//                 sx = {(theme) => ({
//                     '--FormLabel-color': theme.vars.palette.primary.plainColor,
//                 })}
//                 >
//                     MAC Address
//                 </FormLabel>
//                 <Input 
//                 sx = {{'--Input-decoratorChildHeight': '45px'}}
//                 placeholder='MAC'
//                 type = 'text'
//                 required
//                 value = {data.text}
//                 onChange = {(event) => 
//                     setData({text: event.target.value, status: 'initial'})
//                  }
//                  error = {data.status === 'failure'}
//                  endDecoretor = {
//                     <Button
//                     variant='solid'
//                     color = 'primary'
//                     loading = {data.status === 'loading'}
//                     type = 'submit'
//                     sx = {{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
//                     >
//                         Find
//                         </Button>
//                  }
//                  />
//                  {data.status === 'failure' && (
//                     <FormHelperText
//                     sx = {(theme) => ({color: theme.vars.palette.danger[400]})}
//                     >
//                         Something went wrong, please try agine.
//                     </FormHelperText>
//                  )}
//                  {data.status === 'sent' && (
//                     <FormHelperText
//                     sx = {(theme) => ({color: theme.vars.palette.primary[400]})}
//                     >
//                         Send!
//                     </FormHelperText>
//                  )}

//             </FormControle>
//         </form>

//     );
// }
import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

export default function InputSubscription() {
  const [data, setData] = React.useState({
    text: '',
    status: 'initial',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: 'loading' }));
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setData({ text: '', status: 'sent' });
      }, 1500);
    } catch (error) {
      setData((current) => ({ ...current, status: 'failure' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} id="demo">
      <FormControl>
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary.plainColor,
          })}
        >
          Search MAC
        </FormLabel>
        <Input
          sx={{ '--Input-decoratorChildHeight': '45px' }}
          placeholder="MAC"
          type="text"
          required
          value={data.text}
          onChange={(event) =>
            setData({ text: event.target.value, status: 'initial' })
          }
          error={data.status === 'failure'}
          endDecorator={
            <Button
              variant="solid"
              color="primary"
              loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Search
            </Button>
          }
        />
        {data.status === 'failure' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
          >
            Oops! something went wrong, please try again later.
          </FormHelperText>
        )}

        {data.status === 'sent' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
          >
            Successful!
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );
}
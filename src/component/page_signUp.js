import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();

export default function PageSignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   const jsondata = {
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name'),
    };

    fetch('http://localhost:3333/register', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsondata),
            })
              .then((response) => response.json())
              .then((data) => {
                if(data.status === 'success ok'){
                  alert('register successful')   
                  window.location = '/'
                  console.log('Success:', data);
                } else {
                  alert('login failed')
                  console.log('failed:', data);
                }
               
              })
              .catch((error) => {
                console.error('Error:', error);
              });

  };

  const back = (event) => {
    event.preventDefault();
    window.location = '/'
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main',width: 90, height: 90 }}>          
            <LockOutlinedIcon sx={{ m: 1,width: 70, height: 70 }}/>
          </Avatar>
          <Typography component="h1" variant="h5">
          <p className="font-bold text-3xl">
          Sign up
          </p> 
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
          
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={back}>
                    <div className='text-xl'>
                    Already have an account? Sign in
                    </div>
                 
                </Link>
              </Grid>
            </Grid>
            
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}
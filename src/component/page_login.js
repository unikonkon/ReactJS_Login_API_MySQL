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

export default function PageLogin() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsondata =   {
      email: data.get('email'),
      password: data.get('password'),
    };

    fetch('http://localhost:3333/login', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsondata),
        })
          .then((response) => response.json())
          .then((data) => {
            if(data.status === 'ok'){
              alert('Login successful')
              localStorage.setItem('token',data.token);
              window.location = '/user'
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

      
  const signup = (event) => {
    event.preventDefault();
    window.location = '/register'
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"  onClick={signup} >
                  <div className="text-xl pt-3">{"Don't have an account? Sign Up"}</div>
                  
                </Link>
              </Grid>
            </Grid>
           
          </Box>
        </Box>
 
      </Container>
    </ThemeProvider>
  );
}
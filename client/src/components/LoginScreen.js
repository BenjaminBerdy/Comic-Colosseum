import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import React, { useContext,useState } from 'react';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import { AuthContext } from '../context/auth';

const theme = createTheme();

const LOGIN_USER = gql`
  mutation login($username:String!,$password:String!){
    login(username: $username,password: $password){
      id
      email
      username
      token
    }
}`;

export default function LoginScreen() {
  const navigate = useNavigate();
  const context = useContext(AuthContext); 
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  const [errors,setErrors] = useState({})

  const [loginUser] = useMutation(LOGIN_USER,{
    update(_,{data:{login:userData}}){
      context.login(userData);
      navigate('/');
    },
    onError(err){
      console.log(err.graphQLErrors[0].extensions.errors)
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  })

  const onChange = (event) =>{
    setValues({...values, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://wallpaperaccess.com/full/1127899.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={values.username}
                error={errors.username ? true : false}
                onChange={onChange}
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
                value={values.password}
                  error={errors.password ? true : false}
                  onChange={onChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
                {Object.keys(errors).length > 0 &&(
                <div>
                <ul className="list">
                  {Object.values(errors).map(value => (
                    <li key={value}>{value}</li>
                    ))}
                </ul>
              </div>
              )}
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import emailjs from 'emailjs-com';

const theme = createTheme();

const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email:String!){
    forgotPassword(email: $email)
}`;


export default function ForgotPassword() {
  const [values, setValues] = useState({
    email: ''
  })
  const [errors,setErrors] = useState({})

  const [userForgotPassword] = useMutation(FORGOT_PASSWORD,{
    update(_,{data:{forgotPassword:link}}){
      console.log(link)
      setErrors(["Password reset link has been sent to your email."]);
      emailjs.send("service_oq4uyro","template_q7i3i7v",{
        message: link,
        email: values.email,
        },"bJrnH1Ozceu_TKgKC");
    },
    onError(err){ 
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  })

  const onChange = (event) =>{
    setValues({...values, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    userForgotPassword();
  };
  
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
              backgroundColor: 'white',
              padding:3
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
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
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

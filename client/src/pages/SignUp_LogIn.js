

// export default SignUpLogInPage;
import React from 'react';
import { Container, Grid, Typography , useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider} from '@mui/material/styles';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import BucketList from '../components/BucketList'; // Import the BucketList component
// import { gql } from '@apollo/client';

const SignUpLogInPage = () => {
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up / Log In
        </Typography>
        {isSmallScreen ? (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <LoginForm />
            </Grid>
            <Grid item xs={12}>
              <SignupForm />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <LoginForm />
            </Grid>
            <Grid item xs={6}>
              <SignupForm />
            </Grid>
          </Grid>
        )}
        <BucketList />
      </Container>
    </ThemeProvider>
  );
};

export default SignUpLogInPage;

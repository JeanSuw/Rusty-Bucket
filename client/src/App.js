import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpLogInPage from './pages/SignUp_LogIn';
import SingleBucket from './pages/SingleBucket';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import BucketForm from './components/BucketForm';

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, ThemeProvider, createTheme } from "@material-ui/core/styles";

const themeDefault= createTheme({
  palette: {
    background: {
      default: "#EDE1D4"
    }
  }
});


const createMuiTheme = createTheme({
  palette: {
    primary: {
      main: "#ffd740"
    }
  }
});

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={createMuiTheme}>
      <MuiThemeProvider theme={themeDefault} >
        <CssBaseline/>
        
          <Router>
            <div className="flex-column justify-flex-start min-100-vh">
              <Header />
              <div className="container" style={{ marginTop: '20px' }} >
                <Routes>
                  <Route 
                    path="/"
                    element={<Home />}
                  />
                  <Route 
                    path="/signup-login" 
                    element={<SignUpLogInPage />}
                  />
                  <Route 
                    path="/profile" 
                    element={<Profile />}
                  />
            
                  <Route 
                    path="/addBucket" 
                    element={<BucketForm />}
                  />
                  <Route 
                    path="/profiles/:username" 
                    element={<Profile />}
                  />
                  <Route path="/singleBucket/:id" 
                  element={<SingleBucket />}
                    />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        
      </MuiThemeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

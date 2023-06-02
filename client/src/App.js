import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';


const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

function App() {
    return (
      <ApolloProvider client={client}>
        <Navbar/>
        {/* <Router> */}
          {/* <div className="flex-column justify-flex-start min-100-vh">
            
            <div className="container"> */}
                
              {/* <Routes>
                {/* <Route 
                  path="/" 
                  element={<Home />} 
                /> */}
                {/* <Route 
                  path="/login" 
                  element={<Login />} 
                /> */}
                {/* <Route 
                  path="/signup" 
                  element={<Signup />} 
                /> */}
                
              {/* </Routes> */}
            {/* </div>
            
          </div> */}
        {/* </Router> */}
      </ApolloProvider>
    );
  }
  
export default App;
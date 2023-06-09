

//const Home = () => {
  //return (
    //<div>
      //<h1>Coming Soon</h1>
      //<p>We are working on something exciting. Stay tuned!</p>
    //</div>
  //);
//};

//export default Home;
import  React from 'react';
//import { css } from '@emotion/css';
import {ActionAreaCard} from '../Card.js';
import {Grid} from '@material-ui/core';


export default function Home (){
  return(
    <Grid container spacing ={4}>
    <Grid item xs={12} sm={6} md={4}>
    <ActionAreaCard/>
    </Grid>
    <Grid item xs={12}>
      <ActionAreaCard/>
    </Grid>
    </Grid>
   
  )
}




  
  
      
   
  







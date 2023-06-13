

import React from 'react';
//import { css } from '@emotion/css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import hotairballoon from '../images/hotairballoon.PNG';
import northernlights from '../images/northernlights.PNG';
import Egypt from '../images/egypt.PNG';
import scubadiving from '../images/scubadiving.PNG'
import skydiving from '../images/skydiving.PNG';
import marathon from '../images/marathon.PNG';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'; 
import { useNavigate} from 'react-router-dom';
import Auth from '../utils/auth';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 300,
    marginBottom: theme.spacing(2),
    animation: '$rotateCard 60s linear infinite',
  },
  '@keyframes rotateCard': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(720deg)',
    },
  },
}));

export default function Home (){
  const classes = useStyles();
  const navigate = useNavigate();
  return(
    <Grid container>
        <div>
      {Auth.loggedIn() ? (<button className="custom-button" onClick={()=>navigate('/profile')} >
      GO TO YOUR PROFILE   &rarr;
      </button>):<div></div>}
     </div>
    <Grid container spacing={4}>
     
      <Grid item xs={12} sm={6} md={4}>
        <Card className = {classes.card} sx={{ maxWidth: 345, backgroundColor: '#654321' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="254"
            image={hotairballoon}
            alt="Hot air balloon" />
          <CardContent>
            <Typography variant="h5" fontWeight="bold" component="div" color="#F9FdF1">
              Hot Air Balloon
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
       <Card className = {classes.card} sx={{ maxWidth: 345, backgroundColor: '#654321'}}>
         <CardActionArea>
           <CardMedia
            component="img"
              height="254"
              image={northernlights}
              alt="Hot air balloon" />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" component="div" color="#F9F5F1">
                See Northern Lights
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid><Grid item xs={12} sm={6} md={4}>
        <Card className = {classes.card} sx={{ maxWidth: 345, backgroundColor: '#654321' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="254"
              image={Egypt}
              alt="pyramid" />
            <CardContent>
             <Typography variant="h5" fontWeight="bold" component="div" color="#F9F5F1">
               Go to Egypt
             </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className = {classes.card} sx={{ maxWidth: 345, backgroundColor: '#654321' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="254"
              image={scubadiving}
              alt="pyramid" />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" component="div" color="#F9F5F1">
                Learn to Scuba Dive
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className = {classes.card} sx={{ maxWidth: 345, backgroundColor: '#654321' }}>
         <CardActionArea>
           <CardMedia
             component="img"
              height="254"
              image={skydiving}
              alt="pyramid" />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" component="div" color ="#F9F5F1">
                Go Skydiving
            </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
     </Grid>
     <Grid item xs={12} sm={6} md={4}>
       <Card className = {classes.card} sx={{ maxWidth: 345, backgroundColor: "#654321" }}>
         <CardActionArea>
           <CardMedia
             component="img"
             height="254"
              image={marathon}
              alt="marathon" />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" component="div" color= "#F9F5F1">
                Run a Marathon
              </Typography>
            </CardContent>
         </CardActionArea>
       </Card>
     </Grid>
     </Grid>
     </Grid>
  );
}


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     padding: theme.spacing(2),
//   },
//   card: {
//     maxWidth: 300,
//     marginBottom: theme.spacing(2),
//     animation: '$rotateCard 60s linear infinite',
//   },
//   media: {
//     height: 200,
//   },

//   footer: {
//     color: 'white',
//     backgroundColor: '#654321',
//     padding: '10px',
//     fontWeight: 'bold',
//     fontSize: '20px',
//   },
//   '@keyframes rotateCard': {
//     '0%': {
//       transform: 'rotate(0deg)',
//     },
//     '100%': {
//       transform: 'rotate(720deg)',
//     },
//   },
// }));

// const bucketListItems = [
//   {
//     title: 'Hot Air Balloon',
//     image: {hotairballoon}
//   },
//   {
//     title: 'See Northern Lights',
//     image: {northernlights},
//   },
//   {
//     title: 'Go To Egypt',
//     image: {Egypt},
//   },
//   {
//     title: 'Learn to Scuba Dive',
//     image: {scubadiving},
//   },
//   {
//     title: 'Go Skydiving',
//     image: {skydiving},
//   },
//   {
//     title: 'Run a Marathon',
//     image: './client/src/images/marathon.jpg'
//   },
// ];

// const HomePage = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={2}>
//         {bucketListItems.map((item, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Card className={classes.card}>
//               <CardMedia className={classes.media} image={item.image} title={item.title} />
//               <div className={classes.footer}>
//                 <Typography variant="body2" style={{ fontWeight: 'bold' }}>
//                   {item.title}
//                 </Typography>
//               </div>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default HomePage;

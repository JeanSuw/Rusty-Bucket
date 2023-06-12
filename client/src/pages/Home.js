

import React from 'react';
//import { css } from '@emotion/css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import hotairballoon from '../images/hot-air-balloon.jpg';
import northernlights from '../images/northernlights.jpg';
import Egypt from '../images/egypt.jpg';
import scubadiving from '../images/scubadiving.jpg'
import skydiving from '../images/skydiving.jpg';
import marathon from '../images/marathon.jpg';
import {Grid} from '@material-ui/core';


export default function Home (){
  return(
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345, backgroundColor: '#654321' }}>
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
        <Card sx={{ maxWidth: 345, backgroundColor: '#654321'}}>
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
        <Card sx={{ maxWidth: 345, backgroundColor: '#654321' }}>
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
        <Card sx={{ maxWidth: 345, backgroundColor: '#654321' }}>
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
        <Card sx={{ maxWidth: 345, backgroundColor: '#654321' }}>
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
        <Card sx={{ maxWidth: 345, backgroundColor: "#654321" }}>
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
  );
}
      
  

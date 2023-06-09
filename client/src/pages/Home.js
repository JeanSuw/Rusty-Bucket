

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
        <Card sx={{ maxWidth: 345, backgroundColor: 'transparent' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="254"
            image={hotairballoon}
            alt="Hot air balloon" />
          <CardContent>
            <Typography variant="h5" fontWeight="bold" component="div">
              Hot Air Balloon
            </Typography>
            <Typography variant="body2" color="text.secondary">
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345, backgroundColor: 'transparent'}}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="254"
              image={northernlights}
              alt="Hot air balloon" />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" component="div">
                See Northern Lights
              </Typography>
              <Typography variant="body2" color="text.secondary">
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid><Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345, backgroundColor: 'transparent' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="254"
              image={Egypt}
              alt="pyramid" />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" component="div">
                Go to Egypt
              </Typography>
              <Typography variant="body2" color="text.secondary">
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345, backgroundColor: 'transparent' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="254"
              image={scubadiving}
              alt="pyramid" />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" component="div">
                Learn to Scuba Dive
              </Typography>
              <Typography variant="body2" color="text.secondary">
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345, backgroundColor: 'transparent' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="254"
              image={skydiving}
              alt="pyramid" />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" component="div">
                Go Skydiving
              </Typography>
              <Typography variant="body2" color="text.secondary">
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345, backgroundColor: 'transparent' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="254"
              image={marathon}
              alt="marathon" />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" component="div">
                Run a Marathon
              </Typography>
              <Typography variant="body2" color="text.secondary">
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      </Grid>
  );
}
      
  

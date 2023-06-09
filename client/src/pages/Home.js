

//const Home = () => {
  //return (
    //<div>
      //<h1>Coming Soon</h1>
      //<p>We are working on something exciting. Stay tuned!</p>
    //</div>
  //);
//};

//export default Home;
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import hotairballoon from '../images/hot-air-balloon.jpg';
import northernlights from '../images/northernlights.jpg';
import pyramid from '../images/pyramid.jpg';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img" 
          height="254"
          image= {hotairballoon}
          alt="hot air Balloon"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" fontWeight="bold" component="div">
            Hot Air Balloon
          </Typography>
          <Typography variant="body2" color="text.secondary">
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>


  );
}







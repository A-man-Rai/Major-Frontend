import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function MainFeaturedPost(props) {
  const { post ,position} = props;

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb:1,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: position,
        backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h2" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Link variant="subtitle1" href="https://sikkimtourism.gov.in/Public/ThingsToDo/Pilgrimage"   sx={{ color: 'white',textDecoration: 'none','&:hover': {   textDecoration: 'underline',  },}}>
              {post.linkText}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MainFeaturedPost;
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Land from './img.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1500,
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  media: {
    height: 440
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
}));

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      sdirection="column"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <img className={classes.media} style={{ width: '100%' }} src={Land} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" component="p">
          We establish a tamper-proof and reliable mechanism among all the
          parties concerned, by using IoT and Blockchain, so as to prevent blame
          games and maintain an authentic source of trusted information in this
          cyber world. This mechanism will help us to track that if anything
          wrong happens with consignment, then what went wrong and where it went
          wrong.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} alignItems="center">
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          style={{ marginLeft: '40%' }}
        >
          LOGIN
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/register"
          style={{ marginLeft: '40%' }}
        >
          REGISTER
        </Button>
      </Grid>
    </Grid>
  );
}

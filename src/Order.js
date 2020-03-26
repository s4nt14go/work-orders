import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 402,
    display: 'inline-block',
    margin: '2px 4px'
  },
  title: {
    fontSize: 14,
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default function Order(props) {
  const classes = useStyles();

  return <Card className={classes.root} variant="outlined">
      <CardContent>

        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.name}
        </Typography>

        <Typography variant="body2" component="p" style={{textAlign: 'left'}}>
          {props.description}
        </Typography>

        <Grid item xs={12} style={{marginTop: 15, textAlign: 'left'}}>
          <Avatar alt={props.worker.name} src={props.worker.image} style={{display: 'inline-block', verticalAlign: 'middle', marginRight: 15}} className={classes.large} />
          <div style={{textAlign: 'left', display: 'inline-block', verticalAlign: 'middle'}}>
            <Typography variant="body1" style={{textAlign: 'left'}}>{/*display: 'inline'*/}
              {props.worker.name}
            </Typography>
            <Typography variant="body2" style={{textAlign: 'left', display: 'block'}}>
              {props.worker.companyName}<br />
              {props.worker.email}
            </Typography>
          </div>
        </Grid>

      </CardContent>

      <CardActions style={{textAlign: 'right', display: 'block'}}>
        <Typography variant="overline" display="block" gutterBottom>
          {new Date(props.deadline).toLocaleString('en-US', { hour12: true })}
        </Typography>
      </CardActions>
    </Card>
}
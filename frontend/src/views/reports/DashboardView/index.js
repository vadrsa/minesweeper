import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TopTime from './TopTime';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            xs={12}
          >
            <TopTime difficulty="Easy" topTime="30 seconds"/>
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <TopTime difficulty="Medium" topTime="70 seconds"/>
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <TopTime difficulty="Hard" topTime="Unknown"/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;

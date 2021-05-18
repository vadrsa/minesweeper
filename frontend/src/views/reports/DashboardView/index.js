import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TopTime from './TopTime';
import api from 'src/api';

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
  
  const [easyTime, setEasyTime] = useState(0);
  const [mediumTime, setMediumTime] = useState(0);
  const [hardTime, setHardTime] = useState(0);
  useEffect(() => {
    api.getProfile().then(data => {
      setEasyTime(data.easyTime);
      setMediumTime(data.mediumTime);
      setHardTime(data.hardTime);
    })
  })

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
            <TopTime difficulty="Easy" topTime={easyTime + " seconds"}/>
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <TopTime difficulty="Medium" topTime={mediumTime + " seconds"}/>
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <TopTime difficulty="Hard" topTime={hardTime + " seconds"}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;

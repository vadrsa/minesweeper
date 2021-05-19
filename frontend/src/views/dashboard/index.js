import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import TopTime from './TopTime';
import api from 'src/api';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarHalfRoundedIcon from '@material-ui/icons/StarHalfRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
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

  function handleStartNewGame(difficulty){
    api.gameStart(difficulty).then(res => {
      navigate("/app/game");
    });
  }

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
            <TopTime difficulty="Easy" topTime={easyTime + " seconds"} icon={<StarBorderRoundedIcon/>} onStartNewGame={() => handleStartNewGame("E")} />
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <TopTime difficulty="Medium" topTime={mediumTime + " seconds"} icon={<StarHalfRoundedIcon/>} onStartNewGame={() => handleStartNewGame("M")} />
          </Grid>
          <Grid
            item
            lg={4}
            xs={12}
          >
            <TopTime difficulty="Hard" topTime={hardTime + " seconds"} icon={<StarRoundedIcon/>} onStartNewGame={() => handleStartNewGame("H")} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;

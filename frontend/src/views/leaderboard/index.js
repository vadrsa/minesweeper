import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import api from 'src/api';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LeaderboardView = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {
    handleDifficultyChanged("E");
  }, []);

  function handleDifficultyChanged(difficulty){
    api.getProfile().then(profile => {
      setLoading(true);
      api.getTopUsers(difficulty).then(users => {
        const user = users.find(x => x.username === profile.username);
        if(user){
          user.highlight = true;
        }
        users.forEach((x, i) => x.place = i+1);
        return users;
      }).then(setUsers).finally(() => setLoading(false));
    });
  }

  return (
    <Page
      className={classes.root}
      title="Leaderboard"
    >
      <Container maxWidth={false}>
        <Toolbar onDifficultyChanged={handleDifficultyChanged} />
        {isLoading?
          <Box
            marginTop="30px"
            height={300}
            display="flex"
            bgcolor="white"
            alignItems="center"
            justifyContent="center"
          >
              <CircularProgress />
          </Box>
        :
          <Box mt={3}>
            <Results users={users} />
          </Box>}
      </Container>
    </Page>
  );
};

export default LeaderboardView;

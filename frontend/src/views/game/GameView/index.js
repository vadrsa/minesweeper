import React, { useEffect, useState } from 'react';
import { Button, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Board from 'src/components/minesweeper/board';
import Stopwatch from 'src/components/stopwatch';
import api from 'src/api';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

function getNumFlags(state) {
  let count = 0;
  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      if (state[i][j] === -3) {
        count++;
      }
    }
  }
  return count;
}

const Game = () => {
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(0);
  const isFinished = endDate > startDate;
  const numFlags = getNumFlags(state);
  useEffect(() => {
    api
      .getGameState()
      .then(data => {
        setState(data.userArr);
        setStartDate(Date.parse(data.startDate));
        setEndDate(Date.parse(data.endDate));
      })
      .catch(e => console.log(e.response));
  }, []);

  function handleRightClick(e, i, j) {
    e.preventDefault();

    api.gameFlag(i, j).then(data => {
      console.log(data);
      setState(data);
    });
  }

  function handleCellClick(i, j) {
    api.gameClick(i, j).then(data => {
      setState(data.userArr);
      if (data.endDate) {
        setEndDate(Date.parse(data.endDate));
      }
    });
  }

  function restart() {
    api.quitGame().then(
      api
        .getGameState()
        .then(data => {
          setState(data.userArr);
          setStartDate(Date.parse(data.startDate));
          setEndDate(Date.parse(data.endDate));
        })
        .catch(e => console.log(e.response))
    );
  }

  return (
    <Page className={classes.root} title="Game">
      {numFlags}
      <Stopwatch start={startDate} end={endDate} />
      <Board
        state={state}
        onCellClick={handleCellClick}
        onContextMenu={handleRightClick}
      />
      <Button onClick={restart}>Restart</Button>
    </Page>
  );
};

export default Game;

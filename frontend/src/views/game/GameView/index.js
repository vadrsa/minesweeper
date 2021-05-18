import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Board from 'src/components/minesweeper/board';
import api from 'src/api';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Game = () => {
  const classes = useStyles();
  const [state, setState] = useState([]);

  useEffect(() => {
    api
      .getGameState()
      .then(data => {
        setState(data[0].userArr);
      })
      .catch(e => console.log(e));
  }, []);

  function handleCellClick(i, j) {
    api.gameClick(i, j).then(data => {
      console.log(data);
      setState(data.userArr);
    });
  }

  function handleRightClick(e, i, j) {
    e.preventDefault();

    api.gameFlag(i, j).then(data => {
      console.log(data);
      setState(data);
    });
  }

  return (
    <Page className={classes.root} title="Game">
      <Board
        state={state}
        onCellClick={handleCellClick}
        onContextMenu={handleRightClick}
      />
    </Page>
  );
};

export default Game;

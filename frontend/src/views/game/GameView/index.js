import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Board from 'src/components/minesweeper/board';
import api from 'src/api';

const useStyles = makeStyles((theme) => ({
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
        api.getGameState().then(data => {
            setState(data[0].userArr);
        }).catch(e => console.log(e));
    }, [])

    return (
        <Page
            className={classes.root}
            title="Game"
        >
            <Container maxWidth="lg">
                <Board state={state} />
            </Container>
        </Page>
    );
};

export default Game;

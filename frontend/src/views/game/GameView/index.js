import React, { useEffect, useState } from 'react';
import {
    Container,
    makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Board from 'src/components/minesweeper/board';
import Stopwatch from 'src/components/stopwatch';
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
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(0);
    const isFinished = endDate > startDate;

    useEffect(() => {
        api.getGameState().then(data => {
            setState(data.userArr);
            setStartDate(Date.parse(data.startDate));
            setEndDate(Date.parse(data.endDate));
        }).catch(e => console.log(e));
    }, [])

    function handleCellClick(i, j){
        api.gameClick(i, j).then(data =>{
            setState(data.userArr);
            setEndDate(Date.parse(data.endDate));
        });
    }

    return (
        <Page
            className={classes.root}
            title="Game"
        >
            <Container maxWidth="lg">
                <Stopwatch start={startDate} end={endDate}/>
                <Board state={state} onCellClick={handleCellClick} />
            </Container>
        </Page>
    );
};

export default Game;

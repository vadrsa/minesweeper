import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    makeStyles,
    Modal,
    Typography
} from '@material-ui/core';
import Page from 'src/components/Page';
import Board from 'src/components/minesweeper/board';
import Stopwatch from 'src/components/stopwatch';
import api from 'src/api';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const classes = useStyles();
    const [notFound, setNotFound] = useState(true);
    const [state, setState] = useState([]);
    const [startDate, setStartDate] = useState(Date.now());
    const [endDate, setEndDate] = useState(0);
    const [difficulty, setDifficulty] = useState("E");
    const [isLost, setLost] = useState(false);
    const isFinished = endDate > startDate;
    let bombCount = 100;
    switch (difficulty) {
        case "E":
            bombCount = 10;
            break;
        case "M":
            bombCount = 40;
            break;
        case "H":
            bombCount = 99;
            break;
    }
    const numFlags = bombCount - getNumFlags(state);

    useEffect(() => {
        api.getGameState().then(data => {
            if (!data) {
                setNotFound(true);
            }
            else {
                setNotFound(false);
                setState(data.userArr);
                setStartDate(Date.parse(data.startDate));
                setEndDate(Date.parse(data.endDate));
                setDifficulty("E");
                setLost(data.isLost);
            }
        }).catch(e => console.log(e.response));
    }, [])

    function handleRightClick(e, i, j) {
        e.preventDefault();

        api.gameFlag(i, j).then(data => {
            setState(data);
        });
    }

    function handleCellClick(i, j) {
        api.gameClick(i, j).then(data => {
            setState(data.userArr);
            if (data.isLost) {
                setLost(data.isLost);
            }
            if (data.endDate) {
                setEndDate(Date.parse(data.endDate));
            }
        });
    }

    function restart() {
        api.gameStart(difficulty).then(res => location.reload());
    }

    function quit() {
        navigate("/app/dashboard");
    }

    return (
        <Page className={classes.root} title="Game">
            {notFound ?
                <Typography variant="h1" style={{ textAlign: 'center' }}>Game not started</Typography>
                :
                <React.Fragment>
                    <Grid container spacing={4} style={{ marginLeft: "10px" }}>

                        <Grid item>
                            <Stopwatch start={startDate} end={endDate} />
                            <Typography style={{ textAlign: 'center' }}>Number of bombs: {numFlags}</Typography>
                        </Grid>
                        <Grid item >
                            <Grid container alignItems="center" justify="center" spacing={2}>
                                <Grid item>
                                    <Button onClick={restart} variant="contained" color="default">
                                        Restart
                        </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={quit} variant="contained" color="primary">
                                        Quit
                            </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Board
                        state={state}
                        onCellClick={handleCellClick}
                        onContextMenu={handleRightClick}
                    />
                    <Dialog
                        open={isFinished && isLost}
                    >
                        <DialogTitle>You lost the game</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You have lost the game, but there is still chance to improve your best time click restart to restart the game with the same difficulty.
                    </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={restart}>
                                Restart
                    </Button>
                            <Button color="primary" onClick={quit}>
                                Quit
                    </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={isFinished && !isLost}
                    >
                        <DialogTitle>Congratulations you won the game</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You have won the game of minesweeper, maybe try a harder difficulty next time?
                    </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={quit} autoFocus>
                                Ok
                    </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            }
        </Page>
    );
};

export default Game;

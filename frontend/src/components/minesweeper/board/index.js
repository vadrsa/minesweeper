import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../cell';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        padding: "20px",
    },
    clear: {
        clear: "both",
        content: ""
    },
}));

function handleCellClick(i, j){
    
}

const Board = ({ state, ...rest }) => {
    const classes = useStyles();
    return (<div className={classes.root}>
        {state.map((row, i) => {
            return row.map((item, j) => {
                return (
                    <div key={i * row.length + j}>
                        <Cell
                            onClick={() => handleCellClick(i, j)}
                            value={item}
                        />
                        {(j === row.length - 1) ? <div className={classes.clear} /> : ""}
                    </div>
                );
            })
        })}
    </div>);
};

Board.propTypes = {
    state: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

export default Board;

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#FCFAF9",
        border: `1px solid ${theme.palette.background.dark}`,
        borderRadius: "4px",
        float: "left",
        lineHeight: "45px",
        height: "45px",
        textAlign: "center",
        width: "45px",
        cursor: "pointer",
        color: "#333333",
        fontWeight: "600",
        '&:focus': {
            outline: "none"
        }
    },
    hidden: {
        background: "#333333"
    },

    isFlag: {
        color: "#fc543c"
    },
    isMine: {
        color: "#fc543c"
    }
}));

const Cell = ({ value, onClick, ...rest }) => {
    const classes = useStyles();
    function getValue() {
        if (value === -2) {
            return null;
        }
        if (value === -3) {
            return "🚩";
        }
        if (value === -1) {
            return "💣";
        }
        return value;
    }
    let className =
        classes.root +
        (value === -2 ? ` ${classes.hidden}` : "") +
        (value === -1 ? ` ${classes.isMine}` : "") +
        (value === -3 ? ` ${classes.isFlag}` : "");
    return (
        <div
            onClick={onClick}
            className={className}
        >
            {getValue()}
        </div>
    );
};

Cell.propTypes = {
    value: PropTypes.number,
    onClick: PropTypes.func
};

export default Cell;

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Box,
    Select,
    Card,
    CardContent,
    makeStyles,
    MenuItem,
    FormControl,
    InputLabel
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {},
    importButton: {
        marginRight: theme.spacing(1)
    },
    exportButton: {
        marginRight: theme.spacing(1)
    }
}));

const Toolbar = ({ className, onDifficultyChanged, ...rest }) => {
    const classes = useStyles();
    const [difficulty, setDifficulty] = useState("E");

    function changeDifficulty(e){
        const difficulty = e.target.value;
        setDifficulty(difficulty);
        onDifficultyChanged(difficulty);
    }
    return (
        <div
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Box mt={3}>
                <Card>
                    <CardContent>
                        <Box maxWidth={500}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel>Difficulty</InputLabel>
                                <Select value={difficulty} onChange={changeDifficulty}>
                                    <MenuItem value="E">Easy</MenuItem>
                                    <MenuItem value="M">Medium</MenuItem>
                                    <MenuItem value="H">Hard</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
};

Toolbar.propTypes = {
    className: PropTypes.string,
    onDifficultyChanged: PropTypes.func
};

export default Toolbar;
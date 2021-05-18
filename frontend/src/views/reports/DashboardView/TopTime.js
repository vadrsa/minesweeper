import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  // Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
  Box,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const TopTime = ({
  className,
  difficulty,
  topTime,
  icon,
  onStartNewGame,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Top time on {difficulty} mode
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {topTime}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              {icon}
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <Button variant="outlined" color="primary" onClick={onStartNewGame}>Start a new game</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

TopTime.propTypes = {
  className: PropTypes.string,
  difficulty: PropTypes.string,
  topTime: PropTypes.string,
  icon: PropTypes.element,
  onStartNewGame: PropTypes.func
};

export default TopTime;

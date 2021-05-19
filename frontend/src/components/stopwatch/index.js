import React from 'react';
import ReactDOM from 'react-dom';
import StopwatchDisplay from './StopwatchDisplay.js';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    };
    this.start();
  }

  formatTime = (val, ...rest) => {
    let value = val.toString();
    if (value.length < 2) {
      value = '0' + value;
    }
    if (rest[0] === 'ms' && value.length < 3) {
      value = '0' + value;
    }
    return value;
  };

  start = () => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.pace(), 10);
    }
  };

  stop = () => {
    this.setState({ running: false });
    clearInterval(this.watch);
  };

  pace = () => {
    const timePassed = this.props.end > this.props.start? this.props.end - this.props.start: Date.now() - this.props.start;
    const currentTimeMin = Math.floor(timePassed/60000);
    const currentTimeSec = Math.floor((timePassed%60000)/1000);
    const currentTimeMs = Math.floor((timePassed%60000)%1000);
    this.setState({ currentTimeMs: currentTimeMs });
    this.setState({ currentTimeSec: currentTimeSec });
    this.setState({ currentTimeMin: currentTimeMin });
  };

  reset = () => {
    this.setState({
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    });
  };

  render() {
    return (
      <div className={'stopwatch'}>
        <StopwatchDisplay
          ref="display"
          {...this.state}
          formatTime={this.formatTime}
        />
      </div>
    );
  }
}

export default Stopwatch;

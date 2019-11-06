//* Imports
import React from 'react';

export default class Clock extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      date: ``,
      ampm: ``,
    };
  }

  startTime() {
    const today = new Date(); // Get the current date 
    let h = today.getHours(); // Get hours
    // const s = today.getSeconds();

    if (h > 12) h = h - 12;

    this.setState({ date: `${('0' + h).slice(-2)}:${('0' + today.getMinutes()).slice(-2)}`, ampm: h >= 12 ? 'AM' : 'PM' });

    this.timeout = setTimeout(() => this.startTime(), 500);
  }

  componentDidMount() {
    this.startTime();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return <h1 className='clock'>
      {this.state.date}
      <span className='ampm'>
        {this.state.ampm}  
      </span>
    </h1>;
  }
}
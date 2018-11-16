import React, { Component } from 'react';
import _ from 'lodash';

export class LevelSelector extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return <select value={this.props.level} onChange={this.handleClick}> 
      {_.range(1, this.props.numberOfLevels).map(i =>
        <option key={i} value={i}>{i}</option>
      )}
    </select>;
  }

  handleClick(event) {
    const target = event.target;
    if (target) {
      this.props.onClick(event.target.value);
    }
  }

}

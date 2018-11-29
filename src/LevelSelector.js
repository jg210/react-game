// @flow
import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';

import { levelChange } from './redux/actions'

type Props = {
  level: number,
  numberOfLevels: number,
  levelChange: (number) => void
}

class LevelSelector extends Component<Props> {

  // eslint-disable-next-line no-useless-constructor
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <select value={this.props.level} onChange={this.handleClick}> 
      {_.range(1, this.props.numberOfLevels).map((i: number) =>
        <option key={i} value={i}>{i}</option>
      )}
    </select>;
  }

  handleClick = (event: SyntheticEvent<HTMLSelectElement>) => {
    const target: HTMLSelectElement = event.currentTarget;
    if (target) {
      const level: number = parseInt(target.value);
      this.props.levelChange(level);
    }
  }

}

const mapStateToProps = (state: {level: LevelState}) => {
  const level = state.level.current;
  return { level };
};
const actionCreators = {
  levelChange
};
export default connect(mapStateToProps, actionCreators)(LevelSelector);

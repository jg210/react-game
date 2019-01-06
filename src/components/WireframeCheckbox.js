// @flow
//
// (c) 2018-2019 Jeremy Green

import React, { Component } from 'react';
import { connect } from "react-redux";

import { setWireframeMode } from '../redux/actions';
import type { DebugState } from '../redux/reducers/debug';

type Props = {
  enabled: boolean,
  setWireframeMode: (boolean) => void
}

export class WireframeCheckbox extends Component<Props> {

  render() {
    return (
      <div>
        <span>          
          <input type="checkbox" value={this.props.enabled} onChange={this.handleClick}/>
          debug
        </span>
      </div>
    );
  }

  handleClick = (event: SyntheticEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = event.currentTarget;
    this.props.setWireframeMode(target.checked);
  }

}

const mapStateToProps = (state: {debug: DebugState}) => {
  const enabled = state.debug.wireframe;
  return { enabled };
};
const actionCreators = {
  setWireframeMode
};
export default connect(mapStateToProps, actionCreators)(WireframeCheckbox);

// @flow
//
// (c) 2018-2019 Jeremy Green

import React, { Component } from 'react';
import { connect } from "react-redux";

import { start } from '../redux/actions';

type Props = {
  start: () => void
};

export class SplashScreen extends Component<Props> {

  render() {
    return <div/>;
  }

  componentDidMount() {
    this.props.start();
  }

}

const mapStateToProps = null;
const actionCreators = { start };

export default connect(mapStateToProps, actionCreators)(SplashScreen);

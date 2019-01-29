// @flow
//
// (c) 2018-2019 Jeremy Green

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Fullscreenable from 'react-fullscreenable';

import { start } from '../redux/actions';
import { storeFactory } from '../redux/store';
import './App.css';
import Screen from '../screen';

type Props = {
  isFullscreen: boolean, // From Fullscreenable.
  toggleFullscreen: () => void // From Fullscreenable.
};

type State = {
};

class App extends Component<Props,State> {

  // eslint-disable-next-line flowtype/no-weak-types
  store: Object;

  constructor(props: Props) {
    super(props);
    this.store = storeFactory();
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <header className="App-header">
            <Screen toggleFullscreen={this.props.toggleFullscreen}/>
          </header>
        </div>
      </Provider>
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.isFullscreen && !this.props.isFullscreen) {
      this.store.dispatch(start());
    }
  }

}

export default Fullscreenable()(App);

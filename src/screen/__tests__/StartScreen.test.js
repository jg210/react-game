// @flow
//
// (c) 2019 Jeremy Green

import { StartScreen } from '../StartScreen';

import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

it('renders correctly', () => {
  let focusCalled = 0;
  let startGame = jest.fn();
  let toggleFullscreen = jest.fn();
  const store = {
    dispatch: jest.fn(),
    getState: () => ({
      level: {
        current: 1,
        last: 3
      }
    }),
    subscribe: jest.fn()
  }
  function createNodeMock() {
    return {
      focus() {
        focusCalled++;
      },
    };
  }
  const options = { createNodeMock} ;
  const tree = renderer.create(
    <Provider store={store}>
      <StartScreen
        startGame={startGame}
        toggleFullscreen={toggleFullscreen}
      />
    </Provider>,
    options
  ).toJSON();
  expect(tree).toMatchSnapshot();
  expect(focusCalled).toEqual(1);
  expect(startGame).toHaveBeenCalledTimes(0);
  expect(toggleFullscreen).toHaveBeenCalledTimes(0);
});
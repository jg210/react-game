// @flow
//
// (c) 2019 Jeremy Green

import { StartScreen } from '../StartScreen';

import React from 'react';
import renderer from 'react-test-renderer';



it('renders correctly', () => {
  let focusCalled = 0;
  let startGameCalled = 0;
  function createNodeMock() {
    return {
      focus() {
        focusCalled++;
      },
    };
  }
  const options = { createNodeMock} ;
  const tree = renderer
    .create(<StartScreen startGame={() => {startGameCalled++}}/>,
      options)
    .toJSON();
  expect(tree).toMatchSnapshot();
  expect(focusCalled).toEqual(1);
  expect(startGameCalled).toEqual(0);
});
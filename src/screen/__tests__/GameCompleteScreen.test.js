// @flow
//
// (c) 2019 Jeremy Green

import GameCompleteScreen from '../GameCompleteScreen';

import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<GameCompleteScreen/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
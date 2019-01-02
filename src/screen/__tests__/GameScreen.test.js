// @flow

import GameScreen from '../GameCompleteScreen';

import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<GameScreen/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
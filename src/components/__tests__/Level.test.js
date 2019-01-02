// @flow

import React from 'react';
import { Level } from '../Level';

import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Level
      level={3}
      numberOfLevels={5}
      levelChange={() => {}}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});
// @flow

import { StartLevelScreen } from '../StartLevelScreen';

import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<StartLevelScreen level={3}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
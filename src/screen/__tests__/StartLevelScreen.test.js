// @flow
//
// (c) 2019 Jeremy Green

import { StartLevelScreen } from '../StartLevelScreen';

import React from 'react';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const handler = jest.fn();
  const tree = renderer
    .create(<StartLevelScreen level={3} dismissStartLevelScreen={handler}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
  expect(handler).toHaveBeenCalledTimes(0);
});

// TODO Test click event.
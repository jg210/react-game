// @flow
//
// (c) 2019 Jeremy Green

import React from 'react';
import renderer from 'react-test-renderer';

import { SplashScreen } from '../SplashScreen';

it('renders correctly', () => {
  let start = jest.fn();
  const tree = renderer.create(
    <SplashScreen
      start={start}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
  expect(start).toHaveBeenCalledTimes(1);
});
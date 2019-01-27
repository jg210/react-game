// @flow
//
// (c) 2019 Jeremy Green

import { StartLevelScreen } from '../StartLevelScreen';

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

it('renders correctly', () => {
  const handler = jest.fn();
  const tree = renderer.create(
    <StartLevelScreen level={3} dismissStartLevelScreen={handler}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
  expect(handler).toHaveBeenCalledTimes(0);
});

it('sends event when clicked on', () => {
  const handler = jest.fn();
  const component = mount(<StartLevelScreen
    level={2}
    dismissStartLevelScreen={handler}/>
  );
  const div = component.find('div');
  const domNode = div.getDOMNode();
  div.simulate('click', { target: domNode });
  expect(handler).toHaveBeenCalledTimes(1);
});
// @flow
//
// (c) 2018-2019 Jeremy Green

import React from 'react';
import ReactDOM from 'react-dom';
import { Score } from '../Score';

import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


it('renders without crashing', () => {
  const div = document.createElement('div');
  const toggleWireframeMode = jest.fn();
  ReactDOM.render(<Score/>, div);
  ReactDOM.unmountComponentAtNode(div);
  expect(toggleWireframeMode).toHaveBeenCalledTimes(0);
});

it('renders correctly', () => {
  const toggleWireframeMode = jest.fn();
  const tree = renderer
    .create(<Score/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
  expect(toggleWireframeMode).toHaveBeenCalledTimes(0);
});

it('double clicking', () => {
  const handler = jest.fn();
  const component = mount(<Score/>
  );
  const div = component.find('div');
  const domNode = div.getDOMNode();
  div.simulate('dblclick', { target: domNode });
  expect(handler).toHaveBeenCalledTimes(1);
});


// @flow
//
// (c) 2019 Jeremy Green

import React from 'react';
import { WireframeCheckbox } from '../WireframeCheckbox';

import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

it('renders correctly', () => {
  const tree = renderer
    .create(<WireframeCheckbox
      enabled={true}
      setWireframeMode={(enabled: boolean) => {}}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('clicking', () => {
  const handler = jest.fn();
  const component = mount(<WireframeCheckbox
    enabled={false}
    setWireframeMode={handler}/>
  );
  const input = component.find('input');
  const domNode = input.getDOMNode();
  domNode.checked = true;
  input.simulate('change', { target: domNode });
  expect(handler).toHaveBeenCalledTimes(1);
  expect(handler).toHaveBeenCalledWith(true);
});
// @flow
//
// (c) 2019 Jeremy Green

import React from 'react';
import { Level } from '../Level';

import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

it('renders correctly', () => {
  const tree = renderer
    .create(<Level
      level={3}
      numberOfLevels={5}
      levelChange={() => {}}
    />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('sends event when clicked on', () => {
  const numberOfLevels = 3;
  for (let level = 1 ; level <= numberOfLevels; level++) {
    for (let initialLevel = 1 ; initialLevel <= numberOfLevels; initialLevel++) {
      const handler = jest.fn();
      const component = mount(<Level
        level={initialLevel}
        numberOfLevels={numberOfLevels}
        levelChange={handler}/>
      );
      const select = component.find('select');
      const selectDOMNode = select.getDOMNode();
      selectDOMNode.value = level;
      select.simulate('change', { target: selectDOMNode });
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(level);
    }
  }
});
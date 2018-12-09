import React from 'react';
import ReactDOM from 'react-dom';
import { Score } from '../Score';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Score score="123"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer
    .create(<Score score="123"/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
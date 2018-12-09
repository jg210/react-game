import React from 'react';
import ReactDOM from 'react-dom';
import { Score } from '../Score';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Score score="123"/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

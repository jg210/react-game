// @flow
//
// (c) 2019 Jeremy Green

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// $FlowFixMe - getContext is not writable according to flow.
HTMLCanvasElement.prototype.getContext = jest.fn();

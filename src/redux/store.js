// @flow
//
// (c) 2018-2019 Jeremy Green

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from "./reducers";
import sagas from './sagas';

export const storeFactory = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  );
  // $FlowFixMe - problem with Generator type parameters.
  sagas.forEach((saga: Generator<*,*,*>) => {
    sagaMiddleware.run(saga);
  });
  return store;
};




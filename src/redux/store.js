// @flow

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
  sagas.forEach((saga: Generator<*,*,*>) => {
    sagaMiddleware.run(saga);
  });
  return store;
};




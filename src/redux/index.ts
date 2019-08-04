import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import RootReducer from './reducers'
import RootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  (window as any).compose
const store = composeEnhancers
  ? createStore(RootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))
  : createStore(RootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(RootSaga)

export default store

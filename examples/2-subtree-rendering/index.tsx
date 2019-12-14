import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import SearchApp from './SearchApp'
import reducer from './reducer'

const preloadedState = undefined
const storeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION__?.()
const store = createStore(reducer, preloadedState, storeEnhancer)

ReactDOM.render(
  <Provider store={store}>
    <SearchApp />
  </Provider>,
  document.getElementById('root'),
)

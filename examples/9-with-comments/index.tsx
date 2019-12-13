import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App'
import reducer from './reducer'
import storeEnhancer from './storeEnhancer'

const preloadedState = undefined
const store = createStore(reducer, preloadedState, storeEnhancer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

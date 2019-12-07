import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './App'
import reducer from './reducer'

const store = createStore(
  reducer,
  undefined,
  (window as any)?.__REDUX_DEVTOOLS_EXTENSION__?.(),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

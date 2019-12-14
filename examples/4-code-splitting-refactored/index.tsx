import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'
import storeEnhancer from './storeEnhancer'

const preloadedState = undefined
const store = createStore(reducer, preloadedState, storeEnhancer)

const SearchApp = lazy(() => import('./SearchApp'))

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback="Loading...">
      <SearchApp />
    </Suspense>
  </Provider>,
  document.getElementById('root'),
)

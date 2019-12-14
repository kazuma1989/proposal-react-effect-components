import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer, { RootState } from './reducer'
import { reducers } from './appendReducer'

const SearchApp = lazy(() => import('./SearchApp'))

reducers.push(reducer)
const composedReducer = (state: RootState, action: any) =>
  reducers.reduce((s, r) => r(s, action), state)

const preloadedState = undefined
const storeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION__?.()
const store = createStore(composedReducer, preloadedState, storeEnhancer)

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback="Loading...">
      <SearchApp />
    </Suspense>
  </Provider>,
  document.getElementById('root'),
)

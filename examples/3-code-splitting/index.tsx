import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import baseReducer, { RootState } from './reducer'
import { reducer as searchPostsReducer } from './SearchPostsAPI'
import { reducer as searchCommentsReducer } from './SearchCommentsAPI'

const SearchApp = lazy(() => import('./SearchApp'))

const reducer = (state: RootState, action: any) =>
  [baseReducer, searchPostsReducer, searchCommentsReducer].reduce(
    (s, r) => r(s, action),
    state,
  )

const preloadedState = undefined
const storeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION__?.()
const store = createStore(reducer, preloadedState, storeEnhancer)

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback="Loading...">
      <SearchApp />
    </Suspense>
  </Provider>,
  document.getElementById('root'),
)

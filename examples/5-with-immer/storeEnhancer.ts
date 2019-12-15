import {
  Reducer,
  AnyAction,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  compose,
} from 'redux'

export type StoreExt = {
  /**
   * Append a reducer
   *
   * @param additional A reducer to be added
   * @returns The function to remove the added reducer
   * @see https://redux.js.org/recipes/code-splitting
   */
  appendReducer<S = unknown>(
    additional: (state: S, action: AnyAction) => S,
  ): () => void
}

const appendableReducerStoreEnhancer: StoreEnhancer<StoreExt> = (
  createStore: StoreEnhancerStoreCreator<StoreExt>,
) => (reducer, preloadedState) => {
  const reducers: Reducer<unknown, AnyAction>[] = [reducer]
  const store = createStore<any, any>(
    (state, action) => reducers.reduce((s, r) => r(s, action), state),
    preloadedState,
  )

  store.appendReducer = additional => {
    reducers.push(additional)

    return function removeReducer(): void {
      const index = reducers.lastIndexOf(additional)
      if (index < 0) return

      reducers.splice(index, 1)
    }
  }

  return store
}

const reduxDevtoolsExtensionEnhancer:
  | StoreEnhancer
  | undefined = (window as any)?.__REDUX_DEVTOOLS_EXTENSION__?.()

export default reduxDevtoolsExtensionEnhancer
  ? compose(appendableReducerStoreEnhancer, reduxDevtoolsExtensionEnhancer)
  : appendableReducerStoreEnhancer

import { RootState } from './reducer'

type Reducer = (state: RootState, action: any) => RootState

/**
 * Append a reducer
 *
 * @param additional A reducer to be added
 * @returns The function to remove the added reducer
 * @see https://redux.js.org/recipes/code-splitting
 */
export default function appendReducer(additional: Reducer): () => void {
  reducers.push(additional)

  return function removeReducer() {
    const index = reducers.lastIndexOf(additional)
    if (index < 0) return

    reducers.splice(index, 1)
  }
}

export const reducers: Reducer[] = []

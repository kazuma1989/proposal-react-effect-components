import produce from 'immer'
import reducer, { RootState } from './reducer'

describe('reducer', () => {
  const initial = reducer(undefined, {} as any) as RootState

  test('Search.Posts.Submit', () => {
    const current = produce(initial, draft => {
      draft.query = 'initial value'
    })

    expect(
      reducer(current, {
        type: 'Search.Posts.Submit',
        payload: {
          query: 'new value',
        },
      }),
    ).toEqual(
      produce(current, draft => {
        draft.query = 'new value'
        draft.postsStatus = 'waiting'
      }),
    )
  })
})

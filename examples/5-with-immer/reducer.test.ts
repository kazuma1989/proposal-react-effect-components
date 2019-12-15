import produce from 'immer'
import reducer, { RootState } from './reducer'

const initial: RootState = {
  query: '',
  postsStatus: 'initial',
  posts: [],
}

describe('Search.Posts.Submit', () => {
  it('accepts submitted value', () => {
    const state = produce(initial, draft => {
      draft.query = 'initial value'
      draft.postsStatus = 'initial'
    })

    expect(
      reducer(state, {
        type: 'Search.Posts.Submit',
        payload: {
          query: 'new value',
        },
      }),
    ).toEqual(
      produce(state, draft => {
        draft.query = 'new value'
        draft.postsStatus = 'waiting'
      }),
    )
  })

  it('ignores if waiting or loading', () => {
    const state = produce(initial, draft => {
      draft.query = 'initial value'
      draft.postsStatus = 'waiting'
    })

    expect(
      reducer(state, {
        type: 'Search.Posts.Submit',
        payload: {
          query: 'new value',
        },
      }),
    ).toEqual(produce(state, draft => {}))
  })
})

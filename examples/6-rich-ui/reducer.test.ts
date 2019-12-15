import produce from 'immer'
import reducer, { RootState } from './reducer'

const initial: RootState = {
  queryDraft: '',
  queryDraftIsValid: false,
  query: '',
  postsStatus: 'initial',
  posts: [],
}

describe('Search.Posts.Input', () => {
  it('accepts input value', () => {
    const state = produce(initial, draft => {})

    expect(
      reducer(state, {
        type: 'Search.Posts.Input',
        payload: {
          queryDraft: 'new value',
        },
      }),
    ).toEqual(
      produce(state, draft => {
        draft.queryDraft = 'new value'
        draft.queryDraftIsValid = true
      }),
    )
  })
})

describe('Search.Posts.Submit', () => {
  it('accepts submitted value', () => {
    const state = produce(initial, draft => {
      draft.postsStatus = 'initial'
    })

    expect(
      reducer(state, {
        type: 'Search.Posts.Submit',
      }),
    ).toEqual(
      produce(state, draft => {
        draft.postsStatus = 'waiting'
      }),
    )
  })

  it('ignores if waiting or loading', () => {
    const state = produce(initial, draft => {
      draft.postsStatus = 'waiting'
    })

    expect(
      reducer(state, {
        type: 'Search.Posts.Submit',
      }),
    ).toEqual(produce(state, draft => {}))
  })
})

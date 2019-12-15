import produce from 'immer'
import { RootState } from './reducer'
import { reducer } from './APISearchPosts'

const initial: RootState = {
  queryDraft: 'The',
  queryDraftIsValid: true,
  query: '',
  postsStatus: 'initial',
  posts: [],
}

describe('API.Posts.Start', () => {
  it('changes status to loading', () => {
    const state = produce(initial, draft => {
      draft.postsStatus = 'waiting'
    })

    expect(
      reducer(state, {
        type: 'API.Posts.Start',
      }),
    ).toEqual(
      produce(state, draft => {
        draft.postsStatus = 'loading'
      }),
    )
  })
})

describe('API.Posts.Complete', () => {
  it('accepts posts data', () => {
    const state = produce(initial, draft => {
      draft.postsStatus = 'waiting'
      draft.posts = []
    })

    expect(
      reducer(state, {
        type: 'API.Posts.Complete',
        payload: {
          query: 'The',
          posts: [
            {
              userId: 1,
              id: 1,
              title: 'The title 1',
              body: 'The body 1',
            },
            {
              userId: 2,
              id: 2,
              title: 'The title 2',
              body: 'The body 2',
            },
            {
              userId: 3,
              id: 3,
              title: 'The title 3',
              body: 'The body 3',
            },
          ],
        },
      }),
    ).toEqual(
      produce(state, draft => {
        draft.postsStatus = 'complete'
        draft.posts = [
          {
            userId: 1,
            id: 1,
            titleRaw: 'The title 1',
            title: [
              { text: '' },
              { text: 'The', keyword: true },
              { text: ' title 1' },
            ],
            bodyRaw: 'The body 1',
            body: [
              { text: '' },
              { text: 'The', keyword: true },
              { text: ' body 1' },
            ],
            commentsStatus: 'waiting',
            comments: [],
          },
          {
            userId: 2,
            id: 2,
            titleRaw: 'The title 2',
            title: [
              { text: '' },
              { text: 'The', keyword: true },
              { text: ' title 2' },
            ],
            bodyRaw: 'The body 2',
            body: [
              { text: '' },
              { text: 'The', keyword: true },
              { text: ' body 2' },
            ],
            commentsStatus: 'waiting',
            comments: [],
          },
          {
            userId: 3,
            id: 3,
            titleRaw: 'The title 3',
            title: [
              { text: '' },
              { text: 'The', keyword: true },
              { text: ' title 3' },
            ],
            bodyRaw: 'The body 3',
            body: [
              { text: '' },
              { text: 'The', keyword: true },
              { text: ' body 3' },
            ],
            commentsStatus: 'waiting',
            comments: [],
          },
        ]
      }),
    )
  })
})

describe('API.Posts.Error', () => {
  it('changes status to error', () => {
    const state = produce(initial, draft => {
      draft.postsStatus = 'loading'
    })

    expect(
      reducer(state, {
        type: 'API.Posts.Error',
        payload: {
          query: 'some query',
        },
        error: true,
      }),
    ).toEqual(
      produce(state, draft => {
        draft.postsStatus = 'error'
      }),
    )
  })
})

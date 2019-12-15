import produce from 'immer'
import { RootState } from './reducer'
import { reducer } from './APIFetchComments'

const initial: RootState = {
  queryDraft: 'The',
  queryDraftIsValid: true,
  query: 'The',
  postsStatus: 'complete',
  posts: [
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
      body: [{ text: '' }, { text: 'The', keyword: true }, { text: ' body 1' }],
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
      body: [{ text: '' }, { text: 'The', keyword: true }, { text: ' body 2' }],
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
      body: [{ text: '' }, { text: 'The', keyword: true }, { text: ' body 3' }],
      commentsStatus: 'waiting',
      comments: [],
    },
  ],
}

describe('API.Comments.Start', () => {
  it('changes status to loading', () => {
    const state = produce(initial, draft => {})

    expect(
      reducer(state, {
        type: 'API.Comments.Start',
        payload: {
          postId: 2,
        },
      }),
    ).toEqual(
      produce(state, draft => {
        const [, post2] = draft.posts

        post2.commentsStatus = 'loading'
      }),
    )
  })
})

describe('API.Comments.Complete', () => {
  it('accepts comments data', () => {
    const state = produce(initial, draft => {})

    expect(
      reducer(state, {
        type: 'API.Comments.Complete',
        payload: {
          postId: 3,
          comments: [
            {
              postId: 3,
              id: 1,
              name: 'name 3 1',
              email: 'email 3 1',
              body: 'body 3 1',
            },
          ],
        },
      }),
    ).toEqual(
      produce(state, draft => {
        const [, , post3] = draft.posts

        post3.commentsStatus = 'complete'
        post3.comments = [
          {
            postId: 3,
            id: 1,
            name: 'name 3 1',
            email: 'email 3 1',
            body: 'body 3 1',
          },
        ]
      }),
    )
  })
})

describe('API.Comments.Error', () => {
  it('changes status to error', () => {
    const state = produce(initial, draft => {})

    expect(
      reducer(state, {
        type: 'API.Comments.Error',
        payload: {
          postId: 1,
        },
        error: true,
      }),
    ).toEqual(
      produce(state, draft => {
        const [post1] = draft.posts

        post1.commentsStatus = 'error'
      }),
    )
  })
})

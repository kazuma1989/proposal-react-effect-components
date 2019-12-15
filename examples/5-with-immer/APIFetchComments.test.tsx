import produce from 'immer'
import { RootState } from './reducer'
import { reducer } from './APIFetchComments'

const initial: RootState = {
  query: 'query',
  postsStatus: 'complete',
  posts: [
    {
      userId: 1,
      id: 1,
      title: 'The title 1',
      body: 'The body 1',
      commentsStatus: 'waiting',
      comments: [],
    },
    {
      userId: 2,
      id: 2,
      title: 'The title 2',
      body: 'The body 2',
      commentsStatus: 'waiting',
      comments: [],
    },
    {
      userId: 3,
      id: 3,
      title: 'The title 3',
      body: 'The body 3',
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

export type RootState = {
  query: string
  postsStatus: 'initial' | 'waiting' | 'loading' | 'complete' | 'error'
  posts: {
    userId: number
    id: number
    title: string
    body: string

    commentsStatus: 'initial' | 'waiting' | 'loading' | 'complete' | 'error'
    comments: {
      postId: number
      id: number
      name: string
      email: string
      body: string
    }[]
  }[]
}

export type Actions =
  | {
      type: 'Search.Posts.Submit'
      payload: {
        query: string
      }
    }
  | {
      type: 'API.Posts.Start'
    }
  | {
      type: 'API.Posts.Complete'
      payload: {
        query: string
        posts: {
          id: number
          userId: number
          title: string
          body: string
        }[]
      }
    }
  | {
      type: 'API.Posts.Error'
      payload: {
        query: string
        error?: unknown
      }
      error: true
    }
  | {
      type: 'API.Comments.Start'
      payload: {
        postId: number
      }
    }
  | {
      type: 'API.Comments.Complete'
      payload: {
        postId: number
        comments: {
          postId: number
          id: number
          name: string
          email: string
          body: string
        }[]
      }
    }
  | {
      type: 'API.Comments.Error'
      payload: {
        postId: number
        error?: unknown
      }
      error: true
    }

export default function reducer(
  state: RootState | undefined = {
    query: '',
    postsStatus: 'initial',
    posts: [],
  },
  action: Actions,
): RootState {
  switch (action.type) {
    case 'Search.Posts.Submit': {
      const { postsStatus } = state
      if (postsStatus === 'waiting' || postsStatus === 'loading') {
        return state
      }

      const { query } = action.payload
      return {
        ...state,
        query,
        postsStatus: 'waiting',
      }
    }

    case 'API.Posts.Start': {
      return {
        ...state,
        postsStatus: 'loading',
      }
    }

    case 'API.Posts.Complete': {
      const { posts } = action.payload

      return {
        ...state,
        postsStatus: 'complete',
        posts: posts.map(post => ({
          ...post,
          commentsStatus: 'waiting',
          comments: [],
        })),
      }
    }

    case 'API.Posts.Error': {
      return {
        ...state,
        postsStatus: 'error',
      }
    }

    case 'API.Comments.Start': {
      const { postId } = action.payload
      const { posts } = state

      return {
        ...state,
        posts: posts.map(post => {
          if (post.id !== postId) {
            return post
          }

          return {
            ...post,
            commentsStatus: 'loading',
          }
        }),
      }
    }

    case 'API.Comments.Complete': {
      const { postId, comments } = action.payload
      const { posts } = state

      return {
        ...state,
        posts: posts.map(post => {
          if (post.id !== postId) {
            return post
          }

          return {
            ...post,
            commentsStatus: 'complete',
            comments,
          }
        }),
      }
    }

    case 'API.Comments.Error': {
      const { postId } = action.payload
      const { posts } = state

      return {
        ...state,
        posts: posts.map(post => {
          if (post.id !== postId) {
            return post
          }

          return {
            ...post,
            commentsStatus: 'error',
          }
        }),
      }
    }

    default: {
      const _: never = action
      return state
    }
  }
}

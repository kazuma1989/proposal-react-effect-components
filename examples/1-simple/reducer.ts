export type RootState = {
  query: string
  postsStatus: 'initial' | 'waiting' | 'loading' | 'complete' | 'error'
  posts: {
    userId: number
    id: number
    title: string
    body: string
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
        posts,
      }
    }

    case 'API.Posts.Error': {
      return {
        ...state,
        postsStatus: 'error',
      }
    }

    default: {
      const _: never = action
      return state
    }
  }
}

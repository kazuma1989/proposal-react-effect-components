export type RootState = {
  query: string

  postsStatus: APIStatus
  posts: {
    userId: number
    id: number
    title: string
    body: string
  }[]
}

type APIStatus = 'initial' | 'waiting' | 'loading' | 'complete' | 'error'

export type Actions =
  | {
      type: 'Search.Posts.Input'
      payload: {
        query: string
      }
    }
  | {
      type: 'Search.Posts.Submit'
    }
  | {
      type: 'API.Posts.Start'
    }
  | {
      type: 'API.Posts.Complete'
      payload: {
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
      payload: unknown
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
    case 'Search.Posts.Input': {
      const { query } = action.payload
      return {
        ...state,
        query,
      }
    }

    case 'Search.Posts.Submit': {
      const { postsStatus } = state
      if (postsStatus === 'waiting' || postsStatus === 'loading') {
        return state
      }

      return {
        ...state,
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

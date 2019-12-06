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
      type: 'Search.Post.Input'
      payload: {
        query: string
      }
    }
  | {
      type: 'Search.Post.Submit'
    }
  | {
      type: 'API.Post.Start'
    }
  | {
      type: 'API.Post.Complete'
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
      type: 'API.Post.Error'
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
    case 'Search.Post.Input': {
      const { query } = action.payload
      return {
        ...state,
        query,
      }
    }

    case 'Search.Post.Submit': {
      const { postsStatus } = state
      if (postsStatus === 'waiting' || postsStatus === 'loading') {
        return state
      }

      return {
        ...state,
        postsStatus: 'waiting',
      }
    }

    case 'API.Post.Start': {
      return {
        ...state,
        postsStatus: 'loading',
      }
    }

    case 'API.Post.Complete': {
      const { posts } = action.payload

      return {
        ...state,
        postsStatus: 'complete',
        posts,
      }
    }

    case 'API.Post.Error': {
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

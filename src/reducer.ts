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
      type: 'Search.Post.Start'
      payload: {
        query: string
      }
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
        }
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
    case 'Search.Post.Start': {
      return state
    }

    case 'API.Post.Start': {
      return state
    }

    case 'API.Post.Complete': {
      return state
    }

    case 'API.Post.Error': {
      return state
    }

    default: {
      const _: never = action
      return state
    }
  }
}

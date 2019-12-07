export type RootState = {
  queryDraft: string

  postsStatus: APIStatus
  query: string
  posts: {
    userId: number
    id: number
    titleRaw: string
    title: {
      text: string
      keyword?: boolean
    }[]
    bodyRaw: string
    body: {
      text: string
      keyword?: boolean
    }[]
  }[]
}

type APIStatus = 'initial' | 'waiting' | 'loading' | 'complete' | 'error'

export type Actions =
  | {
      type: 'Search.Posts.Input'
      payload: {
        queryDraft: string
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
    queryDraft: '',
    query: '',
    postsStatus: 'initial',
    posts: [],
  },
  action: Actions,
): RootState {
  switch (action.type) {
    case 'Search.Posts.Input': {
      const { queryDraft } = action.payload
      return {
        ...state,
        queryDraft,
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
        query: state.queryDraft,
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
      const { query } = state

      return {
        ...state,
        postsStatus: 'complete',
        posts: posts.map(({ userId, id, title, body }) => ({
          userId,
          id,
          titleRaw: title,
          bodyRaw: body,
          title: title
            .split(query)
            .flatMap(text => [{ text }, { text: query, keyword: true }])
            .slice(0, -1),
          body: body
            .split(query)
            .flatMap(text => [{ text }, { text: query, keyword: true }])
            .slice(0, -1),
        })),
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

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

    default: {
      const _: never = action
      return state
    }
  }
}

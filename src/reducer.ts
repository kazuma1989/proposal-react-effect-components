export type RootState = {
  queryDraft: string
  queryDraftIsValid: boolean
  query: string

  postsStatus: APIStatus
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
    queryDraftIsValid: false,
    query: '',
    postsStatus: 'initial',
    posts: [],
  },
  action: Actions,
): RootState {
  switch (action.type) {
    case 'Search.Posts.Input': {
      const { queryDraft } = action.payload
      const queryDraftIsValid = Boolean(queryDraft.trim())

      return {
        ...state,
        queryDraft,
        queryDraftIsValid,
      }
    }

    case 'Search.Posts.Submit': {
      const { postsStatus, queryDraft } = state
      if (postsStatus === 'waiting' || postsStatus === 'loading') {
        return state
      }

      return {
        ...state,
        postsStatus: 'waiting',
        query: queryDraft.trim(),
      }
    }

    default: {
      const _: never = action
      return state
    }
  }
}

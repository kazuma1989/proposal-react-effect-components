import produce from 'immer'

export type RootState = {
  queryDraft: string
  queryDraftIsValid: boolean
  query: string

  postsStatus: 'initial' | 'waiting' | 'loading' | 'complete' | 'error'
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
      type: 'Search.Posts.Input'
      payload: {
        queryDraft: string
      }
    }
  | {
      type: 'Search.Posts.Submit'
    }

export default produce(function reducer(
  state: RootState | undefined = {
    queryDraft: '',
    queryDraftIsValid: false,
    query: '',
    postsStatus: 'initial',
    posts: [],
  },
  action: Actions,
): void | RootState {
  switch (action.type) {
    case 'Search.Posts.Input': {
      const { queryDraft } = action.payload

      state.queryDraft = queryDraft
      state.queryDraftIsValid = Boolean(queryDraft.trim())

      return
    }

    case 'Search.Posts.Submit': {
      const { postsStatus } = state
      if (postsStatus === 'waiting' || postsStatus === 'loading') return

      state.query = state.queryDraft.trim()
      state.postsStatus = 'waiting'

      return
    }

    default: {
      const _: never = action
      return state
    }
  }
})

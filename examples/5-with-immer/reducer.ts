import produce from 'immer'

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

export type Actions = {
  type: 'Search.Posts.Submit'
  payload: {
    query: string
  }
}

export default produce(function reducer(
  state: RootState | undefined = {
    query: '',
    postsStatus: 'initial',
    posts: [],
  },
  action: Actions,
): void | RootState {
  switch (action.type) {
    case 'Search.Posts.Submit': {
      const { postsStatus } = state
      if (postsStatus === 'waiting' || postsStatus === 'loading') return

      const { query } = action.payload
      state.query = query
      state.postsStatus = 'waiting'

      return
    }

    default: {
      // const _: never = action
      return state
    }
  }
})

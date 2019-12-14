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

    default: {
      // const _: never = action
      return state
    }
  }
}

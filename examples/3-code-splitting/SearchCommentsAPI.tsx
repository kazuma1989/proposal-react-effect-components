import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState } from './reducer'

export default function SearchCommentsAPI() {
  const posts = useSelector((state: RootState) => state.posts)
  const dispatch = useDispatch<Dispatch<Actions>>()

  useEffect(() => {
    posts.forEach(async ({ id: postId, commentsStatus }) => {
      if (commentsStatus !== 'waiting') return

      dispatch({
        type: 'API.Comments.Start',
        payload: {
          postId,
        },
      })

      try {
        const comments = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
        ).then<
          {
            postId: number
            id: number
            name: string
            email: string
            body: string
          }[]
        >(r => r.json())

        dispatch({
          type: 'API.Comments.Complete',
          payload: {
            postId,
            comments,
          },
        })
      } catch (error) {
        dispatch({
          type: 'API.Comments.Error',
          payload: {
            postId,
            error,
          },
          error: true,
        })
      }
    })
  }, [posts])

  return null
}

type Actions =
  | {
      type: 'API.Comments.Start'
      payload: {
        postId: number
      }
    }
  | {
      type: 'API.Comments.Complete'
      payload: {
        postId: number
        comments: {
          postId: number
          id: number
          name: string
          email: string
          body: string
        }[]
      }
    }
  | {
      type: 'API.Comments.Error'
      payload: {
        postId: number
        error?: unknown
      }
      error: true
    }

export function reducer(state: RootState, action: Actions): RootState {
  switch (action.type) {
    case 'API.Comments.Start': {
      const { postId } = action.payload
      const { posts } = state

      return {
        ...state,
        posts: posts.map(post => {
          if (post.id !== postId) {
            return post
          }

          return {
            ...post,
            commentsStatus: 'loading',
          }
        }),
      }
    }

    case 'API.Comments.Complete': {
      const { postId, comments } = action.payload
      const { posts } = state

      return {
        ...state,
        posts: posts.map(post => {
          if (post.id !== postId) {
            return post
          }

          return {
            ...post,
            commentsStatus: 'complete',
            comments,
          }
        }),
      }
    }

    case 'API.Comments.Error': {
      const { postId } = action.payload
      const { posts } = state

      return {
        ...state,
        posts: posts.map(post => {
          if (post.id !== postId) {
            return post
          }

          return {
            ...post,
            commentsStatus: 'error',
          }
        }),
      }
    }

    default: {
      const _: never = action
      return state
    }
  }
}

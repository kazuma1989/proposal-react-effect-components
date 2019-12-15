import { useEffect } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { Dispatch, Store } from 'redux'
import produce from 'immer'
import { RootState } from './reducer'
import { StoreExt } from './storeEnhancer'

export default function APIFetchComments() {
  const store = useStore() as Store<RootState, Actions> & StoreExt
  useEffect(() => store.appendReducer(reducer), [])

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

export const reducer = produce(function(
  state: RootState,
  action: Actions,
): void {
  switch (action.type) {
    case 'API.Comments.Start': {
      const { postId } = action.payload
      const { posts } = state

      const post = posts.find(p => p.id === postId)
      if (!post) return

      post.commentsStatus = 'loading'

      return
    }

    case 'API.Comments.Complete': {
      const { postId, comments } = action.payload
      const { posts } = state

      const post = posts.find(p => p.id === postId)
      if (!post) return

      post.commentsStatus = 'complete'
      post.comments = comments

      return
    }

    case 'API.Comments.Error': {
      const { postId } = action.payload
      const { posts } = state

      const post = posts.find(p => p.id === postId)
      if (!post) return

      post.commentsStatus = 'error'

      return
    }

    default: {
      const _: never = action
    }
  }
})

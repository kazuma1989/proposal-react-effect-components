import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState, Actions } from './reducer'

export default function APIFetchComments() {
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

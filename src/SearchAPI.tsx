import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState, Actions } from './reducer'
import { fetchPosts } from './api'

export function SearchAPI() {
  const [query, status] = useSelector(
    (state: RootState) => [state.query, state.postsStatus] as const,
  )
  const dispatch = useDispatch<Dispatch<Actions>>()

  useEffect(() => {
    ;(async () => {
      if (status !== 'waiting') return

      dispatch({
        type: 'API.Post.Start',
      })

      try {
        const posts = await fetchPosts(query)

        dispatch({
          type: 'API.Post.Complete',
          payload: {
            posts,
          },
        })
      } catch (e) {
        dispatch({
          type: 'API.Post.Error',
          payload: e,
          error: true,
        })
      }
    })()
  }, [query, status])

  return null
}

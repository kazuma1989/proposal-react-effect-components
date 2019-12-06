import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState, Actions } from './reducer'

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
        const posts: {
          userId: number
          id: number
          title: string
          body: string
        }[] = await fetch(
          `https://jsonplaceholder.typicode.com/posts?q=${query}`,
        ).then(r => r.json())

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

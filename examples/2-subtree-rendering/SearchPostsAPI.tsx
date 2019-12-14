import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState, Actions } from './reducer'

export default function SearchPostsAPI() {
  const [query, status] = useSelector((state: RootState) => [
    state.query,
    state.postsStatus,
  ])
  const dispatch = useDispatch<Dispatch<Actions>>()

  useEffect(() => {
    ;(async () => {
      if (status !== 'waiting') return

      dispatch({
        type: 'API.Posts.Start',
      })

      try {
        const posts = await fetch(
          `https://jsonplaceholder.typicode.com/posts?q=${query}`,
        ).then<
          {
            userId: number
            id: number
            title: string
            body: string
          }[]
        >(r => r.json())

        dispatch({
          type: 'API.Posts.Complete',
          payload: {
            query,
            posts,
          },
        })
      } catch (error) {
        dispatch({
          type: 'API.Posts.Error',
          payload: {
            query,
            error,
          },
          error: true,
        })
      }
    })()
  }, [query, status])

  return null
}

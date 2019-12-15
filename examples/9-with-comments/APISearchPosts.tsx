import { useEffect } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { Dispatch, Store } from 'redux'
import { RootState } from './reducer'
import { StoreExt } from './storeEnhancer'

export default function APISearchPosts() {
  const store = useStore() as Store<RootState, Actions> & StoreExt
  useEffect(() => store.appendReducer(reducer), [])

  const [query, status] = useSelector((state: RootState) => [
    state.query,
    state.postsStatus,
  ])
  const dispatch = useDispatch<Dispatch<Actions>>()
  // or better
  // const dispatch = store.dispatch

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

type Actions =
  | {
      type: 'API.Posts.Start'
    }
  | {
      type: 'API.Posts.Complete'
      payload: {
        query: string
        posts: {
          id: number
          userId: number
          title: string
          body: string
        }[]
      }
    }
  | {
      type: 'API.Posts.Error'
      payload: {
        query: string
        error?: unknown
      }
      error: true
    }

function reducer(state: RootState, action: Actions): RootState {
  switch (action.type) {
    case 'API.Posts.Start': {
      return {
        ...state,
        postsStatus: 'loading',
      }
    }

    case 'API.Posts.Complete': {
      const { query, posts } = action.payload

      return {
        ...state,
        postsStatus: 'complete',
        posts: posts.map(({ userId, id, title, body }) => ({
          userId,
          id,
          titleRaw: title,
          bodyRaw: body,
          title: title
            .split(query)
            .flatMap(text => [{ text }, { text: query, keyword: true }])
            .slice(0, -1),
          body: body
            .split(query)
            .flatMap(text => [{ text }, { text: query, keyword: true }])
            .slice(0, -1),

          commentsStatus: 'waiting',
          comments: [],
        })),
      }
    }

    case 'API.Posts.Error': {
      return {
        ...state,
        postsStatus: 'error',
      }
    }

    default: {
      const _: never = action
      return state
    }
  }
}

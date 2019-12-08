# EffectComponents: An idea for handling async effects in the React + Redux architecture

Wrap your async effects with a kind of components, that are called **EffectComponents**.

EffectComponents are not so special components, but:

- It is mainly composed of **useEffect** hooks for async effects
- It only returns null and renders nothing

For example:

```typescript
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState, Actions } from './reducer'

export default function SearchPostsAPI() {
  // Slice values from the root state.
  // Tuple here is optional.
  // You can use a normal object or call `useSelector` multi times.
  const [query, status] = useSelector((state: RootState) => [
    state.query,
    state.postsStatus,
  ])
  const dispatch = useDispatch<Dispatch<Actions>>()

  // Main async effects
  useEffect(() => {
    ;(async () => {
      // Guard to avoid too many calls
      if (status !== 'waiting') return

      // A start action
      // Notify that the state should get to "loading" status
      dispatch({
        type: 'API.Posts.Start',
      })

      try {
        // Awaits API call completes
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

        // A complete action
        // Its payload contains API inputs and outputs
        dispatch({
          type: 'API.Posts.Complete',
          payload: {
            query,
            posts,
          },
        })
      } catch (error) {
        // An error action
        // Its payload contains API inputs and error details
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
```

## Motivation

In the React + Redux architecture, async effects always require a tough decision:

- _Where to place async effects?_
- _Which library should I use?_
- _Is the library not too hard to learn?_
- _Does the architecture design scale?_

But even with no 3rd parties, React and Redux are themselves well designed.  
We should utilize the core features at the maximum.

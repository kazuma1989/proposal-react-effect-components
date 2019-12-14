import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { Container, Title, SearchForm } from '../../lib/components'
import { RootState, Actions } from './reducer'

export default function SearchInput() {
  const status = useSelector((state: RootState) => state.postsStatus)
  const dispatch = useDispatch<Dispatch<Actions>>()

  const [query, setQuery] = useState('')

  return (
    <Container>
      <Title>Search posts</Title>

      <SearchForm
        text={query}
        onChange={setQuery}
        disabled={status === 'loading'}
        onSubmit={() =>
          dispatch({
            type: 'Search.Posts.Submit',
            payload: {
              query,
            },
          })
        }
      />
    </Container>
  )
}

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { Container, Title, SearchForm } from '../../lib/components'
import { RootState, Actions } from './reducer'

export default function SearchInput() {
  const [status, draft, valid] = useSelector((state: RootState) => [
    state.postsStatus,
    state.queryDraft,
    state.queryDraftIsValid,
  ])
  const dispatch = useDispatch<Dispatch<Actions>>()

  return (
    <Container>
      <Title>Search posts</Title>

      <SearchForm
        text={draft}
        onChange={text =>
          dispatch({
            type: 'Search.Posts.Input',
            payload: {
              queryDraft: text,
            },
          })
        }
        disabled={status === 'loading' || !valid}
        onSubmit={() =>
          dispatch({
            type: 'Search.Posts.Submit',
          })
        }
      />
    </Container>
  )
}

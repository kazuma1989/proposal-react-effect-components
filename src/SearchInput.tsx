import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { Container, Title, SearchForm } from './components'
import { RootState, Actions } from './reducer'
import { shallowEqual } from './util'

export default function SearchInput() {
  const [queryDraft, valid, status] = useSelector(
    (state: RootState) => [
      state.queryDraft,
      state.queryDraftIsValid,
      state.postsStatus,
    ],
    shallowEqual,
  )
  const dispatch = useDispatch<Dispatch<Actions>>()

  return (
    <Container>
      <Title>Search posts</Title>

      <SearchForm
        text={queryDraft}
        onChange={queryDraft =>
          dispatch({
            type: 'Search.Posts.Input',
            payload: {
              queryDraft,
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

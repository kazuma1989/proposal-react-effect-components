import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState, Actions } from './reducer'

export default function SearchInput() {
  const queryDraft = useSelector((state: RootState) => state.queryDraft)
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
        onSubmit={() =>
          dispatch({
            type: 'Search.Posts.Submit',
          })
        }
      />
    </Container>
  )
}

function Container({ children }: { children?: React.ReactNode }) {
  return (
    <section className="section">
      <div className="container">{children}</div>
    </section>
  )
}

function Title({ children }: { children?: React.ReactNode }) {
  return <h1 className="title">{children}</h1>
}

function SearchForm({
  text,
  onChange,
  onSubmit,
}: {
  text?: string
  onChange?(text: string): unknown
  onSubmit?(): unknown
}) {
  return (
    <form onClick={e => e.preventDefault()}>
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input
            className="input"
            type="search"
            value={text}
            onChange={e => onChange?.(e.target.value)}
          />
        </p>

        <p className="control">
          <button type="submit" className="button is-info" onClick={onSubmit}>
            Search
          </button>
        </p>
      </div>
    </form>
  )
}

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { RootState, Actions } from './reducer'

export default function SearchInput() {
  const query = useSelector((state: RootState) => state.query)
  const dispatch = useDispatch<Dispatch<Actions>>()

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Search posts</h1>

        <form onClick={e => e.preventDefault()}>
          <div className="field is-grouped">
            <p className="control is-expanded">
              <input
                className="input"
                type="search"
                value={query}
                onChange={e => {
                  dispatch({
                    type: 'Search.Post.Input',
                    payload: {
                      query: e.target.value,
                    },
                  })
                }}
              />
            </p>

            <p className="control">
              <button
                type="submit"
                className="button is-info"
                onClick={() => {
                  dispatch({
                    type: 'Search.Post.Submit',
                  })
                }}
              >
                Search
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

import React from 'react'

export default function SearchInput() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Search posts</h1>

        <form>
          <div className="field is-grouped">
            <p className="control is-expanded">
              <input className="input" type="text" />
            </p>

            <p className="control">
              <button type="button" className="button is-info">
                Search
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

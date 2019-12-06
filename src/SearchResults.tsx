import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './reducer'

export default function SearchResults() {
  const posts = useSelector((state: RootState) => state.posts)

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Results</h1>

        {posts.map(({ id, title, body }) => (
          <div key={id} className="box">
            <article className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  <img
                    src="https://bulma.io/images/placeholders/128x128.png"
                    alt="Image"
                  />
                </figure>
              </div>

              <div className="media-content">
                <div className="content">
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

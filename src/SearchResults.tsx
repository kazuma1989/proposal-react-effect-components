import React from 'react'

export default function SearchResults() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Results</h1>

        <div className="box">
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
                <p>
                  <strong>John Smith</strong>
                  <small>@johnsmith</small>
                  <small>31m</small>
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean efficitur sit amet massa fringilla egestas. Nullam
                  condimentum luctus turpis.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

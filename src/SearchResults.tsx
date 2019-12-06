import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './reducer'

export default function SearchResults() {
  const posts = useSelector((state: RootState) => state.posts)

  return (
    <Container>
      <Title>Results</Title>

      {posts.map(({ id, title, body }) => (
        <Post
          key={id}
          title={title}
          body={body}
          imgSrc="https://bulma.io/images/placeholders/128x128.png"
        />
      ))}
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

function Post({
  title,
  body,
  imgSrc,
}: {
  title?: string
  body?: string
  imgSrc?: string
}) {
  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={imgSrc} alt={title} />
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
  )
}

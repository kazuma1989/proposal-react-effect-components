import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './reducer'

export default function SearchResults() {
  const [posts, status, query] = useSelector(
    (state: RootState) =>
      [state.posts, state.postsStatus, state.query] as const,
  )

  return (
    <Container>
      <Title>Results</Title>

      {status === 'error' ? (
        <ErrorMessage>ERROR</ErrorMessage>
      ) : status === 'loading' ? (
        <Loading />
      ) : !posts.length ? (
        <Empty />
      ) : (
        posts.map(({ id, title, body }) => (
          <Post
            key={id}
            title={title}
            body={body}
            keyword={query}
            imgSrc="https://bulma.io/images/placeholders/128x128.png"
          />
        ))
      )}
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

function ErrorMessage({ children }: { children?: React.ReactNode }) {
  return (
    <article className="message is-danger">
      <div className="message-body">{children}</div>
    </article>
  )
}

function Loading() {
  return <progress className="progress is-light" />
}

function Empty() {
  return (
    <article className="message">
      <div className="message-body">EMPTY</div>
    </article>
  )
}

function Post({
  title,
  body,
  keyword,
  imgSrc,
}: {
  title?: string
  body?: string
  keyword?: string
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
            <strong>
              <TextWithKeyword text={title} keyword={keyword} />
            </strong>

            <p>
              <TextWithKeyword text={body} keyword={keyword} />
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}

function TextWithKeyword({
  text,
  keyword,
}: {
  text?: string
  keyword?: string
}) {
  if (!text || !keyword) {
    return <>{text}</>
  }

  return (
    <>
      {text
        .split(keyword)
        .flatMap((v, i) => [
          v,
          <span key={i} className="has-background-warning">
            {keyword}
          </span>,
        ])
        .slice(0, -1)}
    </>
  )
}

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, APIStatus } from './reducer'

export default function SearchResults() {
  const [posts, status] = useSelector(
    (state: RootState) => [state.posts, state.postsStatus] as const,
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
        posts.map(({ id, title, body, comments, commentsStatus }) => (
          <Post
            key={id}
            title={title}
            body={body}
            imgSrc="https://bulma.io/images/placeholders/128x128.png"
            commentsStatus={commentsStatus}
            comments={comments}
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
  title = [],
  body = [],
  imgSrc,
  commentsStatus = 'initial',
  comments = [],
}: {
  title?: {
    text: string
    keyword?: boolean
  }[]
  body?: {
    text: string
    keyword?: boolean
  }[]
  imgSrc?: string
  commentsStatus?: APIStatus
  comments?: {
    id: number
    name: string
    email: string
    body: string
  }[]
}) {
  const titleRaw = title.map(v => v.text).join('')
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-128x128">
            <img src={imgSrc} alt={titleRaw} />
          </figure>
        </div>

        <div className="media-content">
          <div className="content">
            <strong>
              {title.map((v, i) =>
                v.keyword ? (
                  <span key={i} className="has-background-warning">
                    {v.text}
                  </span>
                ) : (
                  v.text
                ),
              )}
            </strong>

            <p>
              {body.map((v, i) =>
                v.keyword ? (
                  <span key={i} className="has-background-warning">
                    {v.text}
                  </span>
                ) : (
                  v.text
                ),
              )}
            </p>

            {(comments.length >= 1 || commentsStatus === 'loading') && (
              <p className="has-text-right">
                {showComments ? (
                  <button
                    type="button"
                    className={`button is-outlined is-small ${
                      commentsStatus === 'loading' ? 'is-loading' : ''
                    }`}
                    onClick={() => setShowComments(false)}
                  >
                    Hide comments
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`button is-outlined is-small ${
                      commentsStatus === 'loading' ? 'is-loading' : ''
                    }`}
                    onClick={() => setShowComments(true)}
                  >
                    Show comments
                  </button>
                )}
              </p>
            )}
          </div>

          {showComments &&
            comments.map(({ id, email, body }) => (
              <Comment
                key={id}
                email={email}
                body={body}
                imgSrc="https://bulma.io/images/placeholders/96x96.png"
              />
            ))}
        </div>
      </article>
    </div>
  )
}

function Comment({
  email,
  body,
  imgSrc,
}: {
  email?: string
  body?: string
  imgSrc?: string
}) {
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-48x48">
          <img src={imgSrc} />
        </p>
      </figure>

      <div className="media-content content">
        <div className="content">
          <strong>{email}</strong>
          <p>{body}</p>
        </div>
      </div>
    </article>
  )
}

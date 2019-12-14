/**
 * Requires https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css
 */
import React, { useState } from 'react'

export function Container({ children }: { children?: React.ReactNode }) {
  return (
    <section className="section">
      <div className="container">{children}</div>
    </section>
  )
}

export function Title({ children }: { children?: React.ReactNode }) {
  return <h1 className="title">{children}</h1>
}

export function SearchForm({
  text,
  onChange,
  disabled,
  onSubmit,
}: {
  text?: string
  onChange?(text: string): unknown
  disabled?: boolean
  onSubmit?(): unknown
}) {
  return (
    <form onClick={e => e.preventDefault()}>
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input
            autoFocus
            className="input"
            type="text"
            value={text}
            onChange={e => onChange?.(e.target.value)}
          />
        </p>

        <p className="control">
          <button
            type="submit"
            className="button is-info"
            disabled={disabled}
            onClick={onSubmit}
          >
            Search
          </button>
        </p>
      </div>
    </form>
  )
}

export function ErrorMessage({ children }: { children?: React.ReactNode }) {
  return (
    <article className="message is-danger">
      <div className="message-body">{children}</div>
    </article>
  )
}

export function Loading() {
  return <progress className="progress is-light" />
}

export function Empty() {
  return (
    <article className="message">
      <div className="message-body">EMPTY</div>
    </article>
  )
}

export function Post({
  title: _title = [],
  body: _body = [],
  imgSrc = 'https://bulma.io/images/placeholders/128x128.png',
  commentsStatus = 'initial',
  comments = [],
}: {
  title?:
    | string
    | {
        text: string
        keyword?: boolean
      }[]
  body?:
    | string
    | {
        text: string
        keyword?: boolean
      }[]
  imgSrc?: string
  commentsStatus?: 'initial' | 'waiting' | 'loading' | 'complete' | 'error'
  comments?: {
    id: number
    name: string
    email: string
    body: string
  }[]
}) {
  const title = (() => {
    if (typeof _title === 'string') {
      return [{ text: _title }]
    }
    return _title
  })()
  const body = (() => {
    if (typeof _body === 'string') {
      return [{ text: _body }]
    }
    return _body
  })()

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

            {commentsStatus === 'loading' ? (
              <p className="has-text-right">
                <button
                  type="button"
                  className="button is-outlined is-small is-loading"
                >
                  Loading
                </button>
              </p>
            ) : (
              comments.length >= 1 && (
                <p className="has-text-right">
                  {showComments ? (
                    <button
                      type="button"
                      className="button is-outlined is-small"
                      onClick={() => setShowComments(false)}
                    >
                      Hide comments
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="button is-outlined is-small"
                      onClick={() => setShowComments(true)}
                    >
                      Show comments
                    </button>
                  )}
                </p>
              )
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

export function Comment({
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

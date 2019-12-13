import React from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Title,
  ErrorMessage,
  Loading,
  Empty,
  Post,
} from '../../lib/components'
import { RootState } from './reducer'

export default function SearchResults() {
  const [posts, status] = useSelector((state: RootState) => [
    state.posts,
    state.postsStatus,
  ])

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

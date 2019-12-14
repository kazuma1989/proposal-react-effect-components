import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Title, Post } from '../../lib/components'
import { RootState } from './reducer'

export default function SearchResults() {
  const posts = useSelector((state: RootState) => state.posts)

  return (
    <Container>
      <Title>Results</Title>

      {posts.map(({ id, title, body }) => (
        <Post key={id} title={title} body={body} />
      ))}
    </Container>
  )
}

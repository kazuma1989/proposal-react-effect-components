import React from 'react'
import SearchPostsAPI from './SearchPostsAPI'
import SearchCommentsAPI from './SearchCommentsAPI'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

export default function SearchApp() {
  return (
    <>
      <SearchPostsAPI />
      <SearchCommentsAPI />

      <SearchInput />
      <SearchResults />
    </>
  )
}

import React from 'react'
import SearchPostsAPI from './SearchPostsAPI'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import SearchCommentsAPI from './SearchCommentsAPI'

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

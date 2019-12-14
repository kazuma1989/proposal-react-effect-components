import React from 'react'
import SearchPostsAPI from './SearchPostsAPI'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

export default function SearchApp() {
  return (
    <>
      <SearchPostsAPI />

      <SearchInput />
      <SearchResults />
    </>
  )
}

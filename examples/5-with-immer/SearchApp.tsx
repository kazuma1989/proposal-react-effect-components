import React from 'react'
import APISearchPosts from './APISearchPosts'
import APIFetchComments from './APIFetchComments'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

export default function SearchApp() {
  return (
    <>
      <APISearchPosts />
      <APIFetchComments />

      <SearchInput />
      <SearchResults />
    </>
  )
}

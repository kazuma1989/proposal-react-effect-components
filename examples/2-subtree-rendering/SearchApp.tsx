import React from 'react'
import APISearchPosts from './APISearchPosts'
import APISearchComments from './APISearchComments'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

export default function SearchApp() {
  return (
    <>
      <APISearchPosts />
      <APISearchComments />

      <SearchInput />
      <SearchResults />
    </>
  )
}

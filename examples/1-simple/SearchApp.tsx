import React from 'react'
import APISearchPosts from './APISearchPosts'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

export default function SearchApp() {
  return (
    <>
      <APISearchPosts />

      <SearchInput />
      <SearchResults />
    </>
  )
}

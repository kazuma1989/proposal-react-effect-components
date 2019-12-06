import React from 'react'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import SearchAPI from './SearchAPI'

export default function SearchApp() {
  return (
    <>
      <SearchAPI />

      <SearchInput />
      <SearchResults />
    </>
  )
}

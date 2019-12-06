import React from 'react'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
import { SearchAPI } from './SearchAPI'

export default function App() {
  return (
    <div>
      <SearchAPI />

      <SearchInput />
      <SearchResults />
    </div>
  )
}

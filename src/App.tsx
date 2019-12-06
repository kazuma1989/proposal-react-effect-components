import React, { Suspense, lazy } from 'react'

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchApp />
    </Suspense>
  )
}

function Loading() {
  return <div>Loading...</div>
}

const SearchApp = lazy(() => import('./SearchApp'))

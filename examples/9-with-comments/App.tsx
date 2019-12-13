import React, { Suspense, lazy } from 'react'

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchApp />
    </Suspense>
  )
}

function Loading() {
  return <progress className="progress is-small is-info" />
}

const SearchApp = lazy(() => import('./SearchApp'))

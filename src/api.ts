export async function fetchPosts(query: string) {
  return (await fetch(
    `https://jsonplaceholder.typicode.com/posts?q=${query}`,
  ).then(r => r.json())) as {
    userId: number
    id: number
    title: string
    body: string
  }[]
}

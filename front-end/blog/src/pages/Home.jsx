import { useEffect, useState } from 'react'
import axios from 'axios'
import PostList from '../components/PostList'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts')
        setPosts(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return <div className="text-center mt-5">Loading...</div>

  return (
    <div className="container py-4">
      <h1 className="mb-4">Latest Blog Posts</h1>
      <PostList posts={posts} />
    </div>
  )
}
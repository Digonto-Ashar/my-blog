import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
  const [formData, setFormData] = useState({ title: '', content: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:5000/api/posts', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4">Create New Post</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="6"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          ></textarea>
        </div>
        
        <button type="submit" className="btn btn-success w-100">Publish Post</button>
      </form>
    </div>
  )
}